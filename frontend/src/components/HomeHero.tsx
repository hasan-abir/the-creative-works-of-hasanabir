"use client";

import CTALink from "@/components/CTALink";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useCallback, useRef } from "react";
import gsap from "gsap";

const HomeHero = () => {
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(() => {}, { scope: container });

  const onImageLoad = contextSafe(
    useCallback(() => {
      gsap
        .timeline({ defaults: { duration: 2, ease: "expo.out" } })
        .to(".img-cover", {
          scaleX: 0,
          transformOrigin: "right",
        })
        .to(
          ".img",
          {
            translateX: 0,
            transformOrigin: "right",
          },
          "<"
        )
        .to(
          ".wave",
          {
            translateY: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.5,
            ease: "circ.out",
          },
          "<+0.5"
        );
    }, [])
  );

  return (
    <div
      ref={container}
      className="w-full flex-1 flex items-center max-w-7xl mx-auto h-full"
    >
      <div className="img translate-x-[-2rem] absolute top-0 left-0 w-full h-screen z-[-2000]">
        <Image
          src="/herobg.webp"
          alt="Quack"
          priority={true}
          quality={100}
          onLoad={onImageLoad}
          fill={true}
          className="object-cover object-left lg:object-right"
        />
      </div>
      <div className="img-cover absolute top-0 left-0 w-full h-screen z-[-1000] bg-light-50 dark:bg-dark-100"></div>
      <section className="text-white w-full h-full flex flex-col items-center sm:items-start justify-center">
        <h1 className={"leading-none text-center sm:text-left"}>
          <span className="wave opacity-0 translate-y-6 text-xl sm:text-5xl block">
            Art & Literature of
          </span>
          <span className="wave opacity-0 translate-y-6 mt-2 font-bold uppercase block text-5xl sm:text-9xl">
            hasan abir
          </span>
        </h1>
        <p className="wave opacity-0 translate-y-6 mb-12 sm:mb-8 sm:mb-12 text-sm sm:text-2xl text-light-100">
          Home for all my work as an artist
        </p>
        <div className="wave opacity-0 translate-y-6">
          <CTALink href="/stories" text="Short Stories" />
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
