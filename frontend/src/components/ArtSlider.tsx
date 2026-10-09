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
  const [activeEl, setActiveEl] = useState<Painting | Book | Song>(content[0]);

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

    setActiveEl(categorizedContent[0]);

    swiperKey = `${cat}-${content.length}`;
  }, []);

  const onSlideChange = useCallback((swiper: SwiperType) => {
    let index = swiper.realIndex - 1;

    if (index < 0) {
      index = content.length + index;
    }

    setActiveEl(content[index]);
  }, []);

  return (
    <>
      {/* <CategoriesList onSelectCat={onSelectCat} /> */}
      <div className="flex min-h-screen ml-8 text-xl font-bold text-white overflow-x-hidden">
        <div
          className={`${(activeEl as Book | Painting).landscape ? "w-[600px]" : "w-[450px]"} transition-all duration-5000 bg-blue-800`}
        >
          <Image
            className="object-contain border-y-2 border-r-2 border-neutral-500 w-full h-auto"
            width={0}
            height={0}
            sizes="100vw"
            src={(activeEl as Book | Painting).thumbnail}
            alt={activeEl.title}
          />
        </div>
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <div className="h-[320px] max-w-[2000px] overflow-x-hidden">
            <Swiper
              spaceBetween={0}
              slidesPerView="auto"
              initialSlide={1}
              loop={true}
              speed={1000}
              grabCursor={true}
              touchRatio={0.2}
              onSlideChange={onSlideChange}
            >
              {content.map((item, i) => (
                <SwiperSlide key={i}>
                  <p className="w-[200px] h-[320px] bg-orange-800 border-r-2 border-black">
                    {item.title}
                  </p>
                  {/* <Slide item={item} /> */}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex-1 bg-red-800">
            <ArtDetail item={activeEl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtSlider;
