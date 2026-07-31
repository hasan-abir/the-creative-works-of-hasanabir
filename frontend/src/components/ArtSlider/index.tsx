"use client";

import ArtSliderMarkup from "@/components/ArtSlider/markup";
import { useEffect, useRef, useState } from "react";
import { FreeMode, Scrollbar } from "swiper/modules";
import Swiper from "swiper";
import "swiper/css";

const ArtSlider = () => {
  const container = useRef<HTMLDivElement>(null);
  const originalArtArray = "1,2,3,4,5,6,7,8,9,10,11".split(",");
  const [inQue, setQue] = useState<unknown | null>(null);
  const [itemArr, setItemArr] = useState<unknown[]>([]);

  useEffect(() => {
    if (container.current) {
      new Swiper(".swiper", {
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        spaceBetween: 4,
        // initialSlide: 3,
        // loopAddBlankSlides: true,
        // slidesOffsetAfter: 64,
        // slidesOffsetBefore: 64,
        // touchRatio: 0.3,
        // freeMode: {
        //   enabled: true,
        //   momentumVelocityRatio: 0.2,
        //   momentumRatio: 0.2,
        //   sticky: true,
        // },
        // modules: [Scrollbar],
      });
    }
  }, []);

  return <ArtSliderMarkup refObj={container} itemArr={originalArtArray} />;
};

export default ArtSlider;
