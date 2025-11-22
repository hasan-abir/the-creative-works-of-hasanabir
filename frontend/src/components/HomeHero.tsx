"use client";

import CTALink from "@/components/CTALink";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ClipboardCheck, PasteClipboard } from "iconoir-react";
import { Fjalla_One } from "next/font/google";

const fjallaOne = Fjalla_One({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

const HomeHero = () => {
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
          "<"
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
          "<+0.5"
        );
    }, [])
  );

  return (
    <div ref={container} className="flex-1 flex items-center">
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
      <section className="text-light-50 w-full h-full flex flex-col items-center sm:items-start justify-center">
        <h1
          className={
            fjallaOne.className +
            " leading-none text-center sm:text-left text-shadow-lg"
          }
        >
          <span className="wave opacity-0 translate-x-6 text-xl sm:text-5xl block">
            Art & Literature of
          </span>
          <span className="wave opacity-0 translate-x-6 mt-2 font-normal uppercase block text-5xl sm:text-9xl">
            hasan abir
          </span>
        </h1>
        <p
          className={
            fjallaOne.className +
            " wave opacity-0 translate-x-6 mb-12 sm:mb-8 sm:mb-12 text-sm sm:text-2xl text-center sm:text-left text-light-100 text-shadow"
          }
        >
          Home for all my work as an artist
        </p>
        <div className="wave flex justify-center sm:justify-start flex-wrap gap-2 opacity-0 translate-x-6 mb-12 sm:mb-8 sm:mb-12">
          <CTALink href="/stories" text="Short Stories" />
          <CTALink href="/poems" text="Poems" />
          <CTALink href="/artwork" text="Artwork" />
          <CTALink href="/songs" text="Songs" />
        </div>
        <div className="wave text-light-200 bg-dark-200 rounded-md flex items-center overflow-hidden opacity-0 translate-x-6">
          <span className="pl-4 pr-2 text-sm sm:text-md">
            contact.hasanabir@gmail.com
          </span>{" "}
          <button
            className={`${
              isMailCopied && "bg-dark-100"
            } transition-[background] p-2 border-l-[1px] border-dark-100`}
            onClick={copyMail}
          >
            {isMailCopied ? (
              <ClipboardCheck className="icon text-xs sm:text-sm" />
            ) : (
              <PasteClipboard className="icon text-xs sm:text-sm" />
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
