"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const BackgroundAnimations = () => {
  const container = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 3,
        repeat: -1,
        paused: true,
        defaults: { ease: "expo.inOut" },
      });
      const baseDuration = 0.1;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const timesToLoop = 3;
      const eachStep = screenWidth / timesToLoop;

      let i = 0;
      while (i <= timesToLoop) {
        tl.add(`left-${i}`)
          .to(container.current, {
            scaleY: 0.8,
            scaleX: 1.5,
            transformOrigin: "bottom left",
            duration: baseDuration,
          })
          .to(
            container.current,
            {
              x: i > 0 ? -eachStep * i : 0,
              duration: baseDuration,
            },
            "<"
          )
          .to(container.current, {
            scaleY: 1,
            scaleX: 1,
            ease: "elastic.out",
          })
          .to(container.current, {
            duration: baseDuration,
          });

        i++;
      }

      // tl.set(container.current, {
      //   y: 300,
      //   rotateY: 180,
      // });

      // let j = 0;
      // while (j <= timesToLoop) {
      //   tl.add(`right-${i}`)
      //     .to(container.current, {
      //       scaleY: 0.8,
      //       scaleX: 1.5,
      //       transformOrigin: "bottom left",
      //       duration: baseDuration,
      //     })
      //     .to(
      //       container.current,
      //       {
      //         x:
      //           j > 0 ? -(screenWidth - eachStep * j) : -screenWidth - eachStep,
      //         duration: baseDuration,
      //       },
      //       "<"
      //     )
      //     .to(container.current, {
      //       scaleY: 1,
      //       scaleX: 1,
      //       ease: "elastic.out",
      //     })
      //     .to(container.current, {
      //       duration: baseDuration,
      //     });

      //   j++;
      // }

      tl.play();
      // tl.pause();
    },
    { scope: container }
  );
  return (
    <div className="absolute top-0 left-0 h-screen w-full overflow-x-hidden z-[-1000]">
      <div className="w-24 h-16 absolute top-[20%] right-0">
        <img
          src="/snail-shell.svg"
          ref={container}
          className="w-full h-full translate-x-full z-[-1000]"
        />
      </div>
    </div>
  );
};

export default BackgroundAnimations;
