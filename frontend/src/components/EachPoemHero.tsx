"use client";

import { Poem } from "@/app/poems/[slug]/page";
import BackNav from "./BackNav";
import CTALink from "./CTALink";
import { DM_Serif_Text } from "next/font/google";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PortableText } from "@portabletext/react";
import { monthNames } from "@/utils/dateVariables";

const dmserif = DM_Serif_Text({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const EachPoemHero = ({ poem }: { poem: Poem }) => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { duration: 0.5, ease: "circ.out" } })
        .to("header", {
          y: 0,
          opacity: 1,
        })
        .to(
          ".back-btn",
          {
            x: 0,
            opacity: 1,
            stagger: 0.2,
          },
          "<+0.5"
        )
        .to(
          ".segment",
          {
            x: 0,
            opacity: 1,
            stagger: 0.2,
          },
          "<+0.5"
        );
    },
    { scope: container }
  );

  return (
    <section ref={container}>
      <div className="flex gap-2 justify-between sm:justify-start mb-12 sm:mb-24">
        <BackNav
          animateOnLoad
          links={[
            {
              url: "/",
              txt: "Home",
            },
            {
              url: "/poems",
              txt: "Poems",
            },
          ]}
        />
        <header className="opacity-0 translate-y-6 ml-0 sm:ml-16">
          <h1 className="font-bold uppercase text-3xl sm:text-6xl">
            {poem.title}
          </h1>
          <p className="text-sm sm:text-base opacity-80">
            Written between{" "}
            <span>
              {monthNames[new Date(poem.startedAt).getMonth()]}.{" "}
              {new Date(poem.startedAt).getFullYear()}
            </span>{" "}
            and{" "}
            <span>
              {monthNames[new Date(poem.finishedAt).getMonth()]}.{" "}
              {new Date(poem.finishedAt).getFullYear()}
            </span>
          </p>
        </header>
      </div>
      <div className="flex-1 mt-8 sm:mt-12 pb-6 sm:pb-16">
        <div className="segment flex justify-center opacity-0 translate-x-6">
          <CTALink
            text="Read PDF"
            href={`/${poem.slug.current}.pdf`}
            target="_blank"
            extraClasses="mb-4 sm:mb-6"
          />
        </div>
        <div className="segment relative p-4 sm:p-8 opacity-0 translate-x-6">
          <div
            className={
              dmserif.className +
              " poem-container text-center text-base sm:text-2xl"
            }
          >
            <PortableText value={poem.body} components={{}} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EachPoemHero;
