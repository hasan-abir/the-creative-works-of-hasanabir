"use client";

import Slide from "@/components/Slide";
import { RefObject } from "react";

interface Props {
  refObj: RefObject<HTMLDivElement>;
  itemArr: unknown[];
  moveSlider: (right?: boolean) => void;
  activeItem: number;
}

const ArtSliderMarkup = ({
  refObj,
  itemArr,
  moveSlider,
  activeItem,
}: Props) => {
  return (
    <>
      <section
        className="slider-container overflow-hidden flex justify-center"
        ref={refObj}
      >
        <div className="slider flex justify-center items-end w-max">
          {itemArr.map((item, i) => (
            <Slide key={i} item={item} isActive={activeItem === i} />
          ))}
        </div>
      </section>
      <div>
        <button className="mr-8" onClick={() => moveSlider()}>
          left
        </button>
        <button onClick={() => moveSlider(true)}>right</button>
      </div>
    </>
  );
};

export default ArtSliderMarkup;
