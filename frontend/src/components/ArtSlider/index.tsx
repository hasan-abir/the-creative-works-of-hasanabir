"use client";

import ArtSliderMarkup from "@/components/ArtSlider/markup";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/css";

const ArtSlider = () => {
  const container = useRef<HTMLDivElement>(null);
  const originalArtArray = Array.from("Sarcaphogus");
  const [inQue, setQue] = useState<unknown | null>(null);
  const [itemArr, setItemArr] = useState<unknown[]>([]);

  useEffect(() => {
    if (container.current) {
      new Swiper(".swiper", {
        slidesPerView: "auto",
        loop: true,
        centeredSlides: true,
        initialSlide: 3,
        spaceBetween: 8,
        slidesOffsetAfter: 64,
        slidesOffsetBefore: 64,
        shortSwipes: false,
        longSwipesMs: 200,
      });
    }
  }, []);

  return <ArtSliderMarkup refObj={container} itemArr={originalArtArray} />;
};

export default ArtSlider;
