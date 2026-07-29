"use client";

import ArtSliderMarkup from "@/components/ArtSlider/markup";
import { useEffect, useRef, useState } from "react";
import { FreeMode, Scrollbar } from "swiper/modules";
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
        // loopAddBlankSlides: true,
        centeredSlides: true,
        // initialSlide: 3,
        spaceBetween: 4,
        // slidesOffsetAfter: 64,
        // slidesOffsetBefore: 64,
        // touchRatio: 0.3,
        // freeMode: {
        //   enabled: true,
        //   momentumVelocityRatio: 0.2,
        //   momentumRatio: 0.2,
        //   sticky: true,
        // },
        modules: [Scrollbar],
      });
    }
  }, []);

  return <ArtSliderMarkup refObj={container} itemArr={originalArtArray} />;
};

export default ArtSlider;
