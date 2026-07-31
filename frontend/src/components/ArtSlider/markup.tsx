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
      <div className="swiper" ref={refObj}>
        <div className="swiper-wrapper">
          {itemArr.map((item, i) => (
            <Slide item={item} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ArtSliderMarkup;
