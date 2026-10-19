"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "@/components/Slide";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import { useCallback, useState } from "react";
import ArtDetail from "@/components/ArtDetail";
import CategoriesList, { Categories } from "@/components/CategoriesList";
import { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";

interface Props {
  paintings: Painting[];
  books: Book[];
  songs: Song[];
}

const ArtSlider = ({ paintings, books, songs }: Props) => {
  let [content, setContent] = useState<(Book | Painting | Song)[]>([
    // ...books,
    // ...songs,
    ...paintings,
  ]);
  const [activeEl, setActiveEl] = useState<number>(0);

  let swiperKey = `${Categories.Highlight}-${content.length}`;

  const onSelectCat = useCallback((cat: Categories) => {
    let categorizedContent = [];

    switch (cat) {
      case Categories.Highlight:
        categorizedContent = [...paintings, ...songs, ...books];
        break;
      case Categories.Books:
        categorizedContent = [...books];
        break;
      case Categories.Paintings:
        categorizedContent = [...paintings];
        break;
      case Categories.Songs:
        categorizedContent = [...songs];
        break;
      default:
        categorizedContent = [...paintings, ...songs, ...books];
    }

    setContent(categorizedContent);

    setActiveEl(0);

    swiperKey = `${cat}-${content.length}`;
  }, []);

  const onSlideChange = useCallback((swiper: SwiperType) => {
    let index = swiper.realIndex;

    setActiveEl(index);
  }, []);

  return (
    <>
      {/* <CategoriesList onSelectCat={onSelectCat} /> */}
      <Swiper
        slidesPerView="auto"
        initialSlide={0}
        centeredSlides={true}
        loop={true}
        grabCursor={true}
        touchRatio={0.2}
        speed={1000}
        onSlideChange={onSlideChange}
      >
        {content.map((item, i) => (
          <SwiperSlide key={i}>
            <Slide item={item} active={activeEl === i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ArtSlider;
