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
  }, [isMailCopied]);

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
    <section className="page-container w-full absolute top-0 left-[50%] translate-x-[-50%] pointer-events-none">
      <div className="pointer-events-auto text-right">
        <h1 className="mb-4">
          <span className="text-base font-bold">Art & Literature of</span>
          <span className="flex items-center">
            <span className="h-px w-full opacity-50 bg-dark-200 flex-1 mr-16"></span>
            <span className={headingFont.className + " hero-heading"}>
              hasan abir
            </span>
          </span>
        </h1>
        <p className="mb-8">Home for all my work as an Artist</p>
        <div className="flex justify-end">
          {highlights ? (
            <CTABtn
              extraClasses="min-w-[200px]"
              href="/#highlights"
              newTab={false}
            >
              <span className="flex items-center justify-between px-6">
                <span>Today's Highlights</span>
              </span>
            </CTABtn>
          ) : null}
          <CTABtn
            primary={false}
            extraClasses="min-w-[200px] ml-4"
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
