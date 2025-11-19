"use client";

import { Story } from "@/app/stories/[slug]/page";
import BackNav from "./BackNav";
import ContinueReading from "./ContinueReading";
import CTALink from "./CTALink";
import { DM_Serif_Text } from "next/font/google";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { monthNames } from "@/utils/dateVariables";

const dmserif = DM_Serif_Text({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const EachStoryHero = ({
  story,
  isPublished,
}: {
  story: Story;
  isPublished: boolean;
}) => {
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
              url: "/stories",
              txt: "Stories",
            },
          ]}
        />
        <header className="opacity-0 translate-y-6 ml-0 sm:ml-16">
          <h1 className="font-bold uppercase text-3xl sm:text-6xl">
            {story.title}
          </h1>
          <p className="text-sm sm:text-base opacity-80">
            Written between{" "}
            <span>
              {monthNames[new Date(story.startedAt).getMonth()]}.{" "}
              {new Date(story.startedAt).getFullYear()}
            </span>{" "}
            and{" "}
            <span>
              {monthNames[new Date(story.finishedAt).getMonth()]}.{" "}
              {new Date(story.finishedAt).getFullYear()}
            </span>
          </p>
        </header>
      </div>
      <div className="flex-1 mt-8 sm:mt-12 pb-6 sm:pb-16">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="segment opacity-0 translate-x-6 max-w-[400px]">
            <ContinueReading basePath="/stories" />
            {isPublished ? (
              <p className="text-sm sm:text-base mb-2">
                <strong>(Only the first page here)</strong>
              </p>
            ) : null}
            <p className="text-sm sm:text-base opacity-80">
              This allows you to read the story line by line, so that it&apos;s
              easier to take in and understand.
            </p>
          </div>
          <div className="segment opacity-0 translate-x-6 h-[0.025rem] sm:w-px sm:h-auto my-8 sm:my-0 sm:mx-8 bg-dark-300 dark:bg-light-100"></div>
          <div className="segment opacity-0 translate-x-6 max-w-[400px]">
            <CTALink
              text="Read PDF"
              href={`/${story.slug.current}.pdf`}
              target="_blank"
              extraClasses="mb-4 sm:mb-6"
            />
            {isPublished ? (
              <p className="text-sm sm:text-base mb-2">
                <strong>(Only the first page here)</strong>
              </p>
            ) : null}
            <p className="text-sm sm:text-base opacity-80">
              This allows you to read the story in its original format, the way
              it would look in a book.
            </p>
          </div>
        </div>
        <div className="segment opacity-0 translate-x-6 mt-8 sm:mt-16 p-4 sm:p-8 bg-light-100 dark:bg-dark-300 rounded-lg">
          <h2 className="font-semibold uppercase text-lg sm:text-3xl mb-6">
            An Excerpt
          </h2>
          <p
            className={dmserif.className + " opacity-60 text-base sm:text-2xl"}
          >
            &quot;{story.excerpt}&quot;
          </p>
        </div>
      </div>
    </section>
  );
};

export default EachStoryHero;
