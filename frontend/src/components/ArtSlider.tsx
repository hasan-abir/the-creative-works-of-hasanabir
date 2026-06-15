"use client";

import Slide from "@/components/Slide";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NullLiteral } from "typescript";

interface Props {}

const ArtSlider = ({}: Props) => {
  const [active, setActive] = useState<number>(5);
  const container = useRef<HTMLDivElement>(null);
  const snapTime = useRef<((valueToSnap: number) => number) | null>(null);
  const seamlessLoop = useRef<gsap.core.Timeline | undefined | null>(null);
  const iteration = useRef<number | null>(null);
  const trigger = useRef<globalThis.ScrollTrigger | null>(null);
  const wrap = useRef<
    ((iterationDelta: number, scrollTo: number) => void) | null
  >(null);
  const scroll = useRef<number | undefined | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

      iteration.current = 0;
      const stagger = 0.1;
      snapTime.current = gsap.utils.snap(stagger);
      const slides = gsap.utils.toArray(".sliders .slide");
      const playhead = { offset: 0 };
      seamlessLoop.current = buildSeamlessLoop(slides, stagger, animFunc);

      if (!seamlessLoop.current || !iteration.current) return;

      const wrapTime = gsap.utils.wrap(0, seamlessLoop.current.duration());
      const wrap = (iterationDelta: number, scrollTo: number) => {
        if (!iteration.current || !trigger.current) return;
        iteration.current += iterationDelta;
        trigger.current.scroll(scrollTo);
        trigger.current.update();
      };
      const scrub = gsap.to(playhead, {
        offset: 0,
        onUpdate() {
          if (!seamlessLoop.current) return;
          seamlessLoop.current.time(wrapTime(playhead.offset));
        },
        duration: 0.5,
        ease: "power3",
        paused: true,
      });
      trigger.current = ScrollTrigger.create({
        start: 0,
        onUpdate(self) {
          if (!seamlessLoop.current || !iteration.current) return;

          scroll.current = self.scroll();

          if (!scroll.current) return;

          if (scroll.current > self.end - 1) {
            wrap(1, 2);
          } else if (scroll.current < 1 && self.direction < 0) {
            wrap(-1, self.end - 2);
          } else {
            scrub.vars.offset =
              (iteration.current + self.progress) *
              seamlessLoop.current.duration();
            scrub.invalidate().restart();
          }
        },
        end: "+=3000",
        pin: ".slider-container",
      });

      ScrollTrigger.addEventListener("scrollEnd", () =>
        scrollToOffset(scrub.vars.offset),
      );

      gsap.set(".slider .slide", { xPercent: 400, opacity: 0, scale: 0 });
    },
    { scope: container },
  );

  const scrollToOffset = contextSafe(
    useCallback((offset: number) => {
      if (
        !snapTime.current ||
        !seamlessLoop.current ||
        !iteration.current ||
        !trigger.current ||
        !scroll.current ||
        !wrap.current
      )
        return;

      let snappedTime = snapTime.current(offset);
      const progress =
        (snappedTime - seamlessLoop.current.duration() * iteration.current) /
        seamlessLoop.current.duration();
      scroll.current = progressToScroll(progress);
      if (progress >= 1 || progress < 0) {
        return wrap.current(Math.floor(progress), scroll.current as number);
      }
      trigger.current.scroll(scroll.current as number);
    }, []),
  );

  const progressToScroll = contextSafe(
    useCallback((progress: number) => {
      if (!trigger.current) return;

      return gsap.utils.clamp(
        1,
        trigger.current.end - 1,
        gsap.utils.wrap(0, 1, progress) * trigger.current.end,
      );
    }, []),
  );

  const animFunc = contextSafe(
    useCallback((element: gsap.TweenTarget) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.in",
          immediateRender: false,
        },
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        0,
      );
      return tl;
    }, []),
  );

  const buildSeamlessLoop = useCallback(
    (
      items: unknown[],
      stagger: number,
      animateFunc: (element: gsap.TweenTarget) => gsap.core.Timeline,
    ) => {
      let overlap = Math.ceil(1 / stagger);
      const startTime = items.length * stagger + 0.5;
      const loopTime = (items.length + overlap) * stagger + 1;
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
      });
      const l = items.length + overlap * 2;
      let timeToAnim = null;
      let i = null;
      let index = null;

      for (i = 0; i < l; i++) {
        index = i % items.length;
        timeToAnim = i * stagger;
        rawSequence.add(
          animateFunc(items[index] as gsap.TweenTarget),
          timeToAnim,
        );
        i <= items.length && seamlessLoop.add("label" + i, timeToAnim);
        rawSequence.time(startTime);
        seamlessLoop
          .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none",
          })
          .fromTo(
            rawSequence,
            { time: overlap * stagger + 1 },
            {
              time: startTime,
              duration: startTime - (overlap * stagger + 1),
              immediateRender: false,
              ease: "none",
            },
          );
        return seamlessLoop;
      }
    },
    [],
  );
  return (
    <section
      className="slider-container overflow-hidden h-[430px] relative"
      ref={container}
    >
      <div
        className="slider flex justify-center items-end w-max absolute top-0 left-1/2 translate-x-[-50%]"
        onClick={animFunc}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Slide key={i} onClick={() => setActive(i)} isActive={active === i} />
        ))}
      </div>
    </section>
  );
};

export default ArtSlider;
