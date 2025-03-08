"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import BackNav from "./BackNav";
import { monthNames } from "@/utils/dateVariables";

const images = [
  {
    title: "The Prayer and Sacrifice for Cheaper Holidays",
    src: "/the-prayer-and-sacrifice-for-cheaper-holidays.jpg",
    from: new Date(2025, 2),
    to: new Date(2024, 0),
  },
  {
    title: "No Problem",
    src: "/noproblem.jpg",
    from: new Date(2024, 11),
    to: new Date(2025, 0),
  },
  {
    title: "Hair",
    src: "/hair.jpg",
    from: new Date(2024, 10),
    to: new Date(2024, 11),
  },
];

const ArtworkHero = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState<number | null>(0);
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
          ".gallery-img",
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
    },
    { scope: container }
  );

  const toggleCurrentImg = contextSafe(
    useCallback((index: number | null) => {
      const duration = 0.2;
      if (typeof index === "number") {
        document.body.style.overflowY = "hidden";

        gsap
          .timeline({ defaults: { duration } })
          .set(".gallery-modal", {
            display: "block",
          })
          .to(
            ".gallery-modal-bg",
            {
              opacity: 0.95,
            },
            "<"
          );
      } else {
        document.body.style.overflowY = "auto";

        gsap
          .timeline({ defaults: { duration } })
          .to(
            ".gallery-modal-bg",
            {
              opacity: 0,
            },
            "<"
          )
          .set(".gallery-modal", {
            display: "none",
          });
      }
      setCurrentImgIndex(index);
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
          Artwork
        </h1>
      </div>

      <div
        data-testid="gallery-modal"
        onClick={() => toggleCurrentImg(null)}
        className="gallery-modal hidden absolute top-0 left-0 w-full h-full z-[600]"
      >
        <div
          data-testid="gallery-modal-bg"
          className="gallery-modal-bg opacity-0 fixed top-0 left-0 w-full h-screen bg-dark-50"
        ></div>
        <div className="gallery-modal-body fixed top-0 left-0 w-full h-screen flex flex-col items-center align-center">
          {typeof currentImgIndex === "number" ? (
            <>
              <div className="relative w-full h-full">
                <Image
                  src={images[currentImgIndex].src}
                  alt={images[currentImgIndex].title}
                  priority={true}
                  quality={100}
                  fill={true}
                  sizes="(max-width: 1280px) 100vw, (max-width: 3840px) 50vw, 33vw"
                  className="object-contain w-full h-full"
                />
              </div>
              <header className="p-6">
                <h1 className="text-2xl font-bold">
                  {images[currentImgIndex].title}{" "}
                  <span className="text-sm sm:text-lg font-normal font-italic">
                    (
                    <span>
                      {
                        monthNames[
                          new Date(images[currentImgIndex].from).getMonth()
                        ]
                      }
                      . {new Date(images[currentImgIndex].from).getFullYear()}
                    </span>{" "}
                    -{" "}
                    <span>
                      {
                        monthNames[
                          new Date(images[currentImgIndex].to).getMonth()
                        ]
                      }
                      . {new Date(images[currentImgIndex].to).getFullYear()}
                    </span>
                    )
                  </span>
                </h1>
              </header>
            </>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 group">
        {images.map((image, index) => {
          return (
            <div
              onClick={() => toggleCurrentImg(index)}
              key={image.src}
              className="relative cursor-pointer group-hover:opacity-30 hover:!opacity-100 opacity-100 transition-opacity overflow-hidden rounded-sm"
              style={{ height: 300 }}
            >
              <Image
                src={image.src}
                alt={image.title}
                priority={true}
                quality={50}
                fill={true}
                sizes="(max-width: 250px) 100vw, (max-width: 500px) 50vw, 33vw"
                className="gallery-img opacity-0 translate-x-6 w-full object-cover h-auto max-w-full"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArtworkHero;
