"use client";

import CTALink from "@/components/CTALink";
import Image from "next/image";
import { Marcellus_SC } from "next/font/google";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
const marcellusSC = Marcellus_SC({
  weight: ["400"],
  subsets: ["latin"],
});

const HomeHero = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { duration: 1, ease: "expo.out" } })
        .to(".line-before", {
          scaleX: 1,
          transformOrigin: "center left",
        })
        .to(
          ".line-after",
          {
            scaleX: 1,
            transformOrigin: "center right",
          },
          "<"
        )
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
        )
        .to(
          ".img-cover",
          {
            scaleX: 0,
            transformOrigin: "center right",
          },
          "<"
        )

        .from(".img-trims", {
          xPercent: 10,
          yPercent: -10,
        })
        .to(
          ".img-trims",
          {
            opacity: 1,
          },
          "<"
        );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="max-w-5xl w-full h-hull flex flex-col items-start"
    >
      <div className="line-before scale-x-0 h-[0.025rem] shrink-0 w-1/2 bg-dark-300 dark:bg-light-100 mb-6 sm:mb-12 opacity-20"></div>
      <section className="w-full sm:w-3/4 mx-auto h-full flex flex-col justify-center">
        <h1
          className={
            marcellusSC.className +
            " uppercase leading-none opacity-0 translate-x-[1rem]"
          }
        >
          <span className="text-2xl sm:text-[4rem]">art pieces by</span>
          <span className="block text-4xl sm:text-8xl">hasan abir</span>
        </h1>
        <p className="sm:text-center sm:mx-auto my-4 sm:my-6 max-w-[350px] text-sm sm:text-lg opacity-0 translate-x-[1rem]">
          Take a dive into this creative collection that I&apos;ve been inspired
          to make.
        </p>
        <section className="flex flex-col items-start justify-between sm:flex-row">
          <div className="mt-10 mr-0 sm:mr-4 order-last sm:order-first relative">
            <div className="img-cover w-full h-full bg-light-100 dark:bg-dark-100 absolute top-0 left-0"></div>
            <div className="img-trims opacity-0 z-[-1000] absolute top-full left-0 w-36 h-36 border-[0.025rem] border-dark-300 dark:border-light-100 translate-x-[-5%] translate-y-[-95%] sm:translate-x-[-10%] sm:translate-y-[-90%]"></div>
            <Image
              src="/ducks.webp"
              alt="Quack"
              width="0"
              height="0"
              priority={true}
              sizes="100vw"
              className="w-[400px] h-auto max-h-[250px]"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <div className="cta-links opacity-0 translate-x-[1rem]">
            <CTALink href="/stories" text="Short Stories" />
          </div>
        </section>
      </section>
      <div className="line-after h-[0.025rem] shrink-0 ml-auto w-1/2 bg-dark-300 dark:bg-light-100 mt-6 sm:mt-12 opacity-20 scale-x-0"></div>
    </div>
  );
};

export default HomeHero;
