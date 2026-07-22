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

  useGSAP(() => {}, { scope: container, dependencies: [isActive] });

  return (
    <div
      className="swiper-slide bg-gray-700 text-light-50 flex-shrink-0 flex justify-center uppercase"
      onClick={onClick}
      ref={container}
    >
      <p className="w-[200px] h-[350px] text-center p-8 text-3xl font-bold">
        {item as string}
      </p>
    </div>
  );
};

export default Slide;
