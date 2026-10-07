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

  return (
    <>
      {/* <CategoriesList onSelectCat={onSelectCat} /> */}
      <div className="flex min-h-screen ml-8 text-xl font-bold text-white overflow-x-hidden">
        <div className="min-w-[500px] bg-blue-600">
          <div className="active">{activeEl.title}</div>
        </div>
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <div className="h-[320px] max-w-[2000px] overflow-x-hidden">
            <Swiper
              spaceBetween={0}
              slidesPerView="auto"
              loop={true}
              speed={1000}
              grabCursor={true}
              touchRatio={0.2}
              onSlideChange={(swiper) => setActiveEl(content[swiper.realIndex])}
            >
              {content.map((item, i) => (
                <SwiperSlide key={i}>
                  <p className="w-[200px] h-[320px] bg-orange-500 border-r-2 border-black">
                    {item.title}
                  </p>
                  {/* <Slide item={item} /> */}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex-1 bg-red-500">
            <ArtDetail item={activeEl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtSlider;
