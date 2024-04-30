"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavArrowLeft } from "iconoir-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

interface Props {
  links: { url: string; txt: string }[];
}

const BackNav = ({ links }: Props) => {
  const [popUp, setPopUp] = useState<boolean>(true);

  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(() => {}, { scope: container });

  const togglePopUp = contextSafe(
    useCallback(() => {
      const duration = 0.2;
      if (popUp) {
        document.body.style.overflowY = "hidden";

        gsap
          .timeline({ defaults: { duration } })
          .set(".popup-bg", {
            display: "block",
          })
          .set(".links", {
            display: "flex",
          })
          .to(".links", {
            opacity: 1,
            x: 0,
          })
          .to(
            ".popup-bg",
            {
              opacity: 0.6,
            },
            "<"
          );
      } else {
        document.body.style.overflowY = "auto";

        gsap
          .timeline({ defaults: { duration } })
          .to(".links", {
            opacity: 0,
            x: "-1rem",
          })
          .to(
            ".popup-bg",
            {
              opacity: 0,
            },
            "<"
          )
          .set(".links", {
            display: "none",
          })
          .set(".popup-bg", {
            display: "none",
          });
      }
      setPopUp(!popUp);
    }, [popUp])
  );
  return (
    <div ref={container}>
      <div className="relative z-[500]">
        <button
          data-testid="back-btn"
          onClick={togglePopUp}
          className="text-2xl w-12 h-12 flex justify-center items-center bg-light-50 dark:bg-dark-200 rounded-full border-2 border-dark-300 dark:border-dark-50"
        >
          <NavArrowLeft />
        </button>
        <div
          data-testid="back-links"
          className="links opacity-0 translate-x-[-1rem] absolute left-full hidden top-0 items-start flex-col sm:flex-row ml-4"
        >
          {links.map((item) => {
            return (
              <Link
                key={item.url}
                data-testid="back-link"
                href={item.url}
                className="text-lg sm:text-xl mb-2 sm:mb-0 sm:mr-2 text-nowrap bg-light-50 dark:bg-dark-200 py-1 px-4 rounded-full text-nowrap  border-2 border-dark-300 dark:border-dark-50"
              >
                {item.txt}
              </Link>
            );
          })}
        </div>
      </div>
      <div
        data-testid="back-btn-bg"
        onClick={togglePopUp}
        className="popup-bg hidden opacity-0 absolute top-0 left-0 w-full h-full z-[400]"
      >
        <div className="fixed top-0 left-0 w-full h-screen bg-dark-50"></div>
      </div>
    </div>
  );
};

export default BackNav;
