"use client";

import { StoryInAList } from "@/app/stories/page";
import BackNav from "./BackNav";
import CTALink from "./CTALink";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const StoriesHero = ({ stories }: { stories: StoryInAList[] }) => {
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(() => {}, { scope: container });

  const onImageLoad = contextSafe(
    useCallback(() => {
      gsap
        .timeline({ defaults: { duration: 0.5, ease: "circ.out" } })
        .to("h1", {
          y: 0,
          opacity: 1,
          stagger: 0.2,
        })
        .to(
          ".card",
          {
            x: 0,
            opacity: 1,
            stagger: 0.2,
          },
          "<+0.5"
        )
        .to(
          ".back-btn",
          {
            x: 0,
            opacity: 1,
            stagger: 0.2,
          },
          "<+0.5"
        );
    }, [])
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
          ]}
        />
        <h1 className="opacity-0 translate-y-6 font-bold uppercase ml-0 sm:ml-16 text-3xl sm:text-6xl">
          Short Stories
        </h1>
      </div>
      <div className="pb-6 sm:pb-16 flex flex-col sm:flex-row gap-8 flex-wrap">
        {stories.map((story, index) => {
          return (
            <div
              key={story._id}
              className="card opacity-0 translate-x-6 rounded-md max-w-[500px] py-8 px-6 sm:py-10 sm:px-8 text-lg sm:text-2xl relative overflow-hidden"
              style={{ boxShadow: "1rem 1rem 0 0 rgba(0, 0, 0, 0.35)" }}
            >
              <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <Image
                  src="/herocard.webp"
                  alt="Waves"
                  priority={true}
                  quality={100}
                  onLoad={index === 0 ? onImageLoad : undefined}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  className="object-cover object-left lg:object-right"
                />
              </div>
              <div className="flex justify-between text-light-50 mb-6">
                <h2 className="uppercase font-semibold text-lg sm:text-3xl pr-2 sm:pr-4">
                  {story.title}
                </h2>
                <p className="font-bold text-base sm:text-lg">
                  {new Date(story.finishedAt).getFullYear()}
                </p>
              </div>
              <p className="line-clamp-4 mb-6 opacity-80 text-light-50 text-base sm:text-lg">
                {story.excerpt}
              </p>

              <CTALink
                block={true}
                href={`/stories/${story.slug.current}`}
                text="Indulge In"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StoriesHero;
