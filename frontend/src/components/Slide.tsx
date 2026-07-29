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
    <div className="swiper-slide" onClick={onClick} ref={container}>
      <p className="h-[50vh] text-center p-8 text-3xl font-bold  bg-gray-700 text-light-50 uppercase">
        {item as string}
      </p>
    </div>
  );
};

export default Slide;
