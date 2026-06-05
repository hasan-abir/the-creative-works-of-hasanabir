"use client";

import Slide from "@/components/Slide";
import { useEffect, useState } from "react";

interface Props {}

const ArtSlider = ({}: Props) => {
  const [active, setActive] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  const SLIDE_WIDTH = 270; // Match your actual Slide component width
  const GAP = 8; // Match your gap-4 spacing

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const targetTranslateX =
    viewportWidth / 2 - SLIDE_WIDTH / 2 - active * (SLIDE_WIDTH + GAP);

  return (
    <section>
      {/* Sllider */}
      <div
        className={`flex justify-center items-end`}
        style={{ transform: `translateX(${targetTranslateX}px)` }}
      >
        {/* Slide Element */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Slide key={i} onClick={() => setActive(i)} isActive={active === i} />
        ))}
      </div>
    </section>
  );
};

export default ArtSlider;
