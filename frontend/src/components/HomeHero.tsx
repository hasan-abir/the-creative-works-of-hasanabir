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
        .timeline({ defaults: { duration: 1, ease: "expo.out" } })
        .to(
          "h1",
          {
            x: 0,
            opacity: 1,
          },
          "<+0.2"
        )
        .to(
          "p",
          {
            x: 0,
            opacity: 0.7,
          },
          "<+0.2"
        )
        .to(
          ".cta-links",
          {
            x: 0,
            opacity: 1,
          },
          "<+0.2"
        );
      // .to(
      //   ".img-cover",
      //   {
      //     scaleX: 0,
      //     transformOrigin: "center right",
      //   },
      //   "<"
      // )
    }, [])
  );

  return (
    <div
      ref={container}
      className="w-full flex-1 flex items-center max-w-7xl mx-auto h-full"
    >
      <div className="absolute top-0 left-0 w-full h-screen z-[-1000]">
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
      <section className="w-full h-full flex flex-col items-center sm:items-start justify-center">
        <h1 className={"leading-none text-center sm:text-left"}>
          <span className="text-xl sm:text-5xl block">Art & Literature of</span>
          <span className="mt-2 sm:mt-4 sm:pl-8 font-bold uppercase block text-5xl sm:text-9xl">
            hasan abir
          </span>
        </h1>
        <p className="sm:pl-8 mb-12 sm:mb-4 sm:mb-12 text-sm sm:text-2xl">
          Home for all my work as an artist
        </p>
        <div className="cta-links sm:pl-8">
          <CTALink href="/stories" text="Short Stories" />
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
