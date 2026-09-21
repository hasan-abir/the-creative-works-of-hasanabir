"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "@/components/Slide";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import { useCallback, useState } from "react";
import ArtDetail from "@/components/ArtDetail";
import CategoriesList, { Categories } from "@/components/CategoriesList";

interface Props {
  paintings: Painting[];
  books: Book[];
  songs: Song[];
}

const ArtSlider = ({ paintings, books, songs }: Props) => {
  let [content, setContent] = useState<(Book | Painting | Song)[]>([
    ...paintings,
    ...songs,
    ...books,
  ]);

  const [activeEl, setActiveEl] = useState<Painting | Book | Song>(content[0]);

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

    setActiveEl(categorizedContent[0]);
  }, []);

  return (
    <>
      <CategoriesList onSelectCat={onSelectCat} />
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        loop={true}
        centeredSlides={true}
        slidesOffsetAfter={64}
        slidesOffsetBefore={64}
        speed={1000}
        grabCursor={true}
        touchRatio={0.2}
        onSlideChange={(swiper) => setActiveEl(content[swiper.realIndex])}
      >
        {content.map((item, i) => (
          <SwiperSlide key={i}>
            <Slide item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <ArtDetail item={activeEl} />
    </>
  );
};

export default ArtSlider;
