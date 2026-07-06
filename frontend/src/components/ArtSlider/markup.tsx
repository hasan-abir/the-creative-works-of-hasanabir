"use client";

import Slide from "@/components/Slide";
import { RefObject } from "react";

interface Props {
  refObj: RefObject<HTMLDivElement>;
  itemArr: unknown[];
  moveSlider: (right?: boolean) => void;
  activeItem: string;
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
        className="slider-container overflow-hidden relative h-[350px]"
        ref={refObj}
      >
        <div className="slider flex justify-center items-end w-max">
          {itemArr.map((item, i) => (
            <Slide key={i} item={item} isActive={activeItem === item} />
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
