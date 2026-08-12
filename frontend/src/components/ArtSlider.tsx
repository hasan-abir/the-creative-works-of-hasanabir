"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "@/components/Slide";
import { Painting } from "@/lib/remark/getContent";

interface Props {
  content: Painting[];
}

const ArtSlider = ({ content }: Props) => {
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
      {content.map((item, i) => (
        <SwiperSlide key={i}>
          <Slide item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ArtSlider;
