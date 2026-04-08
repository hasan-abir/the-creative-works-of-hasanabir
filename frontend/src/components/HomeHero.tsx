"use client";

import CTABtn from "@/components/CTABtn";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { icons } from "@/utils/icons/";
import { headingFont } from "@/utils/fonts";

interface Props {
  highlights?: boolean;
}

const HomeHero = ({ highlights = false }: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(".line", { opacity: 0.5, duration: 0 })
        .to(".line", {
          scaleX: "100%",
          duration: 0.5,
        })
        .to(".hero-txt", { opacity: 1, duration: 1, stagger: 0.2 });
    },
    { scope: container },
  );

  return (
    <section
      className="page-container w-full sm:absolute sm:top-0 sm:left-[50%] sm:translate-x-[-50%] sm:pointer-events-none"
      ref={container}
    >
      <div className="sm:pointer-events-auto sm:text-right">
        <h1 className="mb-4">
          <span className="text-base font-bold hero-txt opacity-0">
            Art & Literature of
          </span>
          <span className="flex items-center">
            <span className="line hidden sm:inline-block h-px w-full bg-dark-200 flex-1 mr-16 scale-x-none opacity-0 origin-left"></span>
            <span
              className={
                headingFont.className + " hero-heading hero-txt opacity-0"
              }
            >
              hasan abir
            </span>
          </span>
        </h1>
        <p className="mb-8 text-sm sm:text-base hero-txt opacity-0">
          Home for all my work as an Artist
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-end">
          {highlights ? (
            <CTABtn
              extraClasses="w-[180px] sm:w-[240px] mb-4 sm:mb-0 sm:mr-4 px-6 text-center hero-txt opacity-0"
              href="/#highlights"
              newTab={false}
            >
              Today&apos;s Highlights
            </CTABtn>
          ) : null}
          <CTABtn
            primary={false}
            extraClasses="w-[180px] sm:w-[240px] hero-txt opacity-0"
            href="mailto:contact.hasanabir@gmail.com"
          >
            <span className="flex items-center justify-between px-6">
              <span>Contact</span>
              <span className="h-px w-full opacity-10 bg-dark-200 ml-2 mr-px flex-1"></span>
              <icons.SendIcon />
            </span>
          </CTABtn>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
