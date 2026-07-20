"use client";

import Slide from "@/components/Slide";
import { RefObject } from "react";

interface Props {
  refObj: RefObject<HTMLDivElement>;
  itemArr: unknown[];
}

const ArtSliderMarkup = ({ refObj, itemArr }: Props) => {
  return (
    <>
      <section
        className="slider-container overflow-hidden relative h-[350px]"
        ref={refObj}
      >
        <div className="swiper">
          <div className="swiper-wrapper">
            {itemArr.map((item, i) => (
              <Slide item={item} key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtSliderMarkup;
