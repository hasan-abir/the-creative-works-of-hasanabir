"use client";

import { PortableText } from "@portabletext/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

interface Props {
  body: any[];
}

const AnimatedRichText = ({ body }: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    (context, contextSafe) => {
      let timeline = gsap.timeline({ paused: true });
      let currentIndex = 1;

      const targets: GSAPTweenTarget[] = gsap.utils.toArray("p");

      let i = 0;

      while (i < targets.length) {
        const targetEl = targets[i];

        timeline = timeline.add(`el-${i}`).to(targetEl, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          onComplete: () => {
            timeline.pause();
          },
        });

        i++;
      }

      timeline.play("el-0");

      let onClick: () => void = () => {};

      if (contextSafe) {
        onClick = contextSafe(() => {
          if (currentIndex < targets.length) {
            timeline.play(`el-${currentIndex}`);
            currentIndex = currentIndex + 1;
          }
        });
      }

      container.current?.addEventListener("click", onClick);

      return () => {
        container.current?.removeEventListener("click", onClick);
      };
    },
    { scope: container }
  );

  return (
    <div className="rich-text-container overflow-x-hidden" ref={container}>
      <PortableText value={body} />
    </div>
  );
};

export default AnimatedRichText;
