"use client";

import Slide from "@/components/Slide";
import { RefObject } from "react";

interface Props {
  refObj: RefObject<HTMLDivElement>;
  artArray: unknown[];
}

const ArtSliderMarkup = ({ refObj, artArray }: Props) => {
  return (
    <section
      className="slider-container overflow-hidden flex justify-center"
      ref={refObj}
    >
      <div className="slider flex justify-center items-end w-max">
        {artArray.map((_, i) => (
          <Slide key={i} />
        ))}
      </div>
    </section>
  );
};

export default ArtSliderMarkup;
