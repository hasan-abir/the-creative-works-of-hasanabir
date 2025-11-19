"use client";

import Link from "next/link";
import { PlaySolid } from "iconoir-react";
import { useCallback, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  text: string;
  href: string;
  block?: boolean;
  target?: string;
  extraClasses?: string;
}

const CTALink = ({
  text,
  href,
  target,
  extraClasses = "",
  block = false,
}: Props) => {
  const container = useRef<HTMLAnchorElement>(null);
  const { contextSafe } = useGSAP(() => {}, { scope: container });

  const animDuration = useMemo(() => {
    return 400;
  }, []);

  const hoverIn = contextSafe(
    useCallback(() => {
      gsap
        .timeline({
          defaults: { ease: "expo.out", duration: animDuration / 1000 },
        })
        .to(".icon", {
          x: "100%",
        })
        .to(
          ".icon-replica",
          {
            x: "-50%",
            y: "-50%",
          },
          "<"
        );
    }, [animDuration])
  );

  const hoverOut = contextSafe(
    useCallback(() => {
      gsap
        .timeline({
          defaults: { ease: "expo.out", duration: animDuration / 1000 },
        })
        .to(".icon", {
          x: 0,
        })
        .to(
          ".icon-replica",
          {
            x: "-150%",
            y: "-50%",
          },
          "<"
        );
    }, [animDuration])
  );

  return (
    <Link
      ref={container}
      href={href}
      target={target ? target : undefined}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      className={
        (block ? "block" : "inline-block") +
        " shadow-lg shadow-primaryrgb-50 uppercase font-bold text-center text-dark-200 bg-gradient-to-r from-light-200 to-primary-50 px-2 sm:px-4 py-1 sm:py-2 rounded-md" +
        (extraClasses && " " + extraClasses)
      }
    >
      <span
        className={
          "flex items-center gap-1 sm:gap-2 text-sm sm:text-xl " +
          (block ? "justify-between" : "justify-start")
        }
      >
        <span className="leading-none">{text}</span>
        <span className="relative h-max overflow-hidden">
          <PlaySolid className="icon text-xs sm:text-sm" />
          <PlaySolid className="icon-replica absolute top-1/2 left-1/2 translate-x-[-150%] translate-y-[-50%] text-xs sm:text-sm" />
        </span>
      </span>
    </Link>
  );
};

export default CTALink;
