"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface Props {
  onClick?: () => void;
  isActive?: boolean;
  item: unknown;
}

const Slide = ({ onClick, isActive, item }: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isActive) {
        gsap.to(container.current, {
          backgroundColor: "#ff0000",
        });
      } else {
        gsap.to(container.current, {
          backgroundColor: "#333333",
        });
      }
    },
    { scope: container, dependencies: [isActive] },
  );

  return (
    <div
      className={`slide-${item as string} w-[200px] h-[350px] text-light-50 mx-1 flex-shrink-0 pointer-events-none flex justify-center uppercase`}
      style={{ backgroundColor: "#333333" }}
      onClick={onClick}
      ref={container}
    >
      {item as string}
    </div>
  );
};

export default Slide;
