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
        slidesPerView: 5,
        loop: true,
        centeredSlides: true,
        initialSlide: 0,
        spaceBetween: 8,
      });
    }
  }, []);

  return <ArtSliderMarkup refObj={container} itemArr={originalArtArray} />;
};

export default ArtSlider;
