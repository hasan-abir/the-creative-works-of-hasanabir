"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "@/components/Slide";

const ArtSlider = () => {
  const originalArtArray = "1,2,3,4,5,6,7,8,9,10".split(",");

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={3}
      loop={true}
      centeredSlides={true}
      slidesOffsetAfter={64}
      slidesOffsetBefore={64}
      speed={1000}
      grabCursor={true}
      touchRatio={0.2}
    >
      {originalArtArray.map((item, i) => (
        <SwiperSlide key={i}>
          <Slide item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ArtSlider;
