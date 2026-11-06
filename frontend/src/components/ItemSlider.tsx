"use client";

import { Book, Painting, Song } from "@/lib/remark/getContent";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import EachItem from "@/components/EachItem";

interface Props {
  items: (Book | Painting | Song)[];
}

const ItemSlider = ({ items }: Props) => {
  return (
    <Swiper spaceBetween={50} slidesPerView={3}>
      {items.map((item) => {
        const imgSrc =
          (item as Book).cover_image || (item as Painting).thumbnail || null;

        return (
          <SwiperSlide key={item.path}>
            <EachItem item={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ItemSlider;
