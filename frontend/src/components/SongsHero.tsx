"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import BackNav from "./BackNav";

const songs = [
  {
    title: "The Sweeping Period",
    src: "/the-sweeping-period.mp3",
  },
  {
    title: "Three Flies",
    src: "/three-flies.mp3",
  },
  {
    title: "A Proper Ride",
    src: "/a-proper-ride.mp3",
  },
  {
    title: "An Offer to a Barricade",
    src: "/an-offer-to-a-barricade.mp3",
  },
];

const SongsHero = () => {
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap
        .timeline({ defaults: { duration: 0.5, ease: "circ.out" } })
        .to("h1", {
          y: 0,
          opacity: 1,
          stagger: 0.2,
        })
        .to(
          ".gallery-song",
          {
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
          ]}
        />
        <h1 className="opacity-0 translate-y-6 font-bold uppercase ml-0 sm:ml-16 text-3xl sm:text-6xl">
          Songs
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 group">
        {songs.map((song, index) => {
          return (
            <div className="gallery-song opacity-0" key={song.src}>
              <h2 className="uppercase font-semibold text-lg sm:text-3xl pr-2 sm:pr-4">
                {song.title}
              </h2>

              <audio controls src={song.src}>
                Your browser does not support the audio element.
              </audio>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SongsHero;
