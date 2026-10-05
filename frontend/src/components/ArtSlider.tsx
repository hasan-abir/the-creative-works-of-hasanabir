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
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        loop={true}
        speed={1000}
        grabCursor={true}
        touchRatio={0.2}
      >
        {content.map((item, i) => (
          <SwiperSlide key={i}>
            <p className="w-[500px] h-[320px] bg-orange-500 border-r-2 border-black">
              Item {i + 1}
            </p>
            {/* <Slide item={item} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex min-h-screen ml-8 text-xl font-bold text-white overflow-x-hidden">
        <div className="col-one min-w-[500px] bg-blue-600">
          <div className="active">Active Item</div>
        </div>
        <div className="col-two flex flex-col">
          <div className="h-[320px] overflow-y-hidden">
            <div className="slider bg-yellow-400 text-black">
              <Swiper
                spaceBetween={0}
                slidesPerView="auto"
                loop={true}
                speed={1000}
                grabCursor={true}
                touchRatio={0.2}
                // onSlideChange={(swiper) => setActiveEl(content[swiper.realIndex])}
              >
                {content.map((item, i) => (
                  <SwiperSlide key={i}>
                    <p className="w-[500px] h-[320px] bg-orange-500 border-r-2 border-black">
                      Item {i + 1}
                    </p>
                    {/* <Slide item={item} /> */}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="detail bg-red-500 flex-1">
            <ArtDetail item={activeEl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtSlider;
