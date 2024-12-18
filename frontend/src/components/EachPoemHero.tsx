"use client";

import { Poem } from "@/app/poems/[slug]/page";
import BackNav from "./BackNav";
import CTALink from "./CTALink";
import { Merriweather } from "next/font/google";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PortableText } from "@portabletext/react";

const merriweather = Merriweather({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
          ".segment",
          {
            x: 0,
            opacity: 1,
            stagger: 0.2,
          },
          "<+0.5"
        )
        .to(
          ".poem-container",
          {
            x: 0,
            opacity: 0.8,
          },
          ">-0.2"
        );
    },
    { scope: container }
  );

  return (
    <section ref={container}>
      <div className="flex gap-2 justify-between sm:justify-start mb-12 sm:mb-24">
        <BackNav
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
            text="Read The PDF"
            href={`/${poem.slug.current}.pdf`}
            target="_blank"
            extraClasses="mb-4 sm:mb-6"
          />
        </div>
        <div className="h-[0.025rem] bg-dark-300 dark:bg-light-100  mt-12 sm:mt-16 opacity-20"></div>
        <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:sm:w-4 before:sm:h-4 before:border-[0.025rem] before:border-dark-300 before:dark:border-light-100 before:translate-x-[-50%]  before:translate-y-[-50%] before:opacity-20 relative p-4 sm:p-8">
          <div
            className={
              merriweather.className +
              " poem-container opacity-0 text-center translate-x-6 text-base sm:text-2xl"
            }
          >
            <PortableText value={poem.body} />
          </div>
        </div>
        <div className="h-[0.025rem] bg-dark-300 dark:bg-light-100 opacity-20"></div>
      </div>
    </section>
  );
};

export default EachPoemHero;
