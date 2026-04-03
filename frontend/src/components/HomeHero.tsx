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
  const [isMailCopied, setIsMailCopied] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(() => {}, { scope: container });

  const copyMail = useCallback(() => {
    setIsMailCopied(true);
    navigator.clipboard.writeText("contact.hasanabir@gmail.com");

    setTimeout(() => {
      setIsMailCopied(false);
    }, 1000);
  }, []);

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
          "<",
        )
        .to(
          ".wave",
          {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.5,
            ease: "circ.out",
          },
          "<+0.5",
        );
    }, []),
  );

  return (
    <section className="page-container w-full sm:absolute sm:top-0 sm:left-[50%] sm:translate-x-[-50%] sm:pointer-events-none">
      <div className="sm:pointer-events-auto sm:text-right">
        <h1 className="mb-4">
          <span className="text-base font-bold">Art & Literature of</span>
          <span className="flex items-center">
            <span className="hidden sm:inline-block h-px w-full opacity-50 bg-dark-200 flex-1 mr-16"></span>
            <span className={headingFont.className + " hero-heading"}>
              hasan abir
            </span>
          </span>
        </h1>
        <p className="mb-8 text-sm sm:text-base">
          Home for all my work as an Artist
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-end">
          {highlights ? (
            <CTABtn
              extraClasses="w-[180px] sm:w-[240px] mb-4 sm:mb-0 sm:mr-4 px-6 text-center"
              href="/#highlights"
              newTab={false}
            >
              Today&apos;s Highlights
            </CTABtn>
          ) : null}
          <CTABtn
            primary={false}
            extraClasses="w-[180px] sm:w-[240px]"
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
