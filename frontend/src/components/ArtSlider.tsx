"use client";

import Slide from "@/components/Slide";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {}

const ArtSlider = ({}: Props) => {
  const [active, setActive] = useState<number>(5);
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

      let iteration = 0;
      const stagger = 0.1;
      const snapTime = gsap.utils.snap(stagger);
      const slides = gsap.utils.toArray(".sliders .slide");
      const playhead = { offset: 0 };
      const seamlessLoop = buildSeamlessLoop(slides, stagger, animFunc);
      if (seamlessLoop) {
        const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
        const wrap = (iterationDelta: number, scrollTo: number) => {
          iteration += iterationDelta;
          trigger.scroll(scrollTo);
          trigger.update();
        };
        const scrub = gsap.to(playhead, {
            offset: 0,
            onUpdate() {
              seamlessLoop.time(wrapTime(playhead.offset));
            },
            duration: 0.5,
            ease: "power3",
            paused: true,
          }),
          trigger = ScrollTrigger.create({
            start: 0,
            onUpdate(self) {
              let scroll = self.scroll();
              if (scroll > self.end - 1) {
                wrap(1, 2);
              } else if (scroll < 1 && self.direction < 0) {
                wrap(-1, self.end - 2);
              } else {
                scrub.vars.offset =
                  (iteration + self.progress) * seamlessLoop.duration();
                scrub.invalidate().restart();
              }
            },
            end: "+=3000",
            pin: ".gallery",
          });
      }

      gsap.set(".slider .slide", { xPercent: 400, opacity: 0, scale: 0 });

      // animFunc(".slider .slide");
    },
    { scope: container },
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
        // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
        paused: true,
        repeat: -1, // to accommodate infinite scrolling/looping
        onRepeat() {
          // works around a super rare edge case bug that's fixed GSAP 3.6.1
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
      });
      const l = items.length + overlap * 2;
      let timeToAnim = null;
      let i = null;
      let index = null;

      // now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
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
    <section className="overflow-hidden h-[430px] relative" ref={container}>
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
