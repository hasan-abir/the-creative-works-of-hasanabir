"use client";

import { ReactNode, useCallback, useState, useRef } from "react";
import { headingFont } from "@/utils/fonts";
import { icons } from "@/utils/icons";
import CTABtn from "@/components/CTABtn";

interface Props {
  children: ReactNode;
  heading: string;
}

const CardList = ({ children, heading }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = useCallback((left: boolean = true) => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const scrollChange = (scrollRef.current.scrollWidth * 10) / 100;

    let scrollVal = scrollLeft + scrollChange;

    if (!left) {
      scrollVal = scrollLeft - scrollChange;
    }

    scrollRef.current.scrollTo({
      left: scrollVal,
      behavior: "smooth",
    });
  }, []);

  return (
    <section>
      <h1 className={headingFont.className + " big-heading"}>{heading}</h1>
      <div className="relative carousel-container">
        <div
          className="carousel-track flex overflow-x-auto mb-12 pb-12 pt-6 px-12"
          ref={scrollRef}
        >
          {children}
        </div>
        <div className="absolute left-0 top-0 bg-light-100 h-full bg-to-nothing-left flex items-center">
          <CTABtn
            primary={false}
            extraClasses="h-[150px] ml-2 text-white"
            onClick={() => scrollCarousel(false)}
          >
            <icons.PreviousIcon />
          </CTABtn>
        </div>

        <div className="absolute right-0 top-0 bg-light-100 h-full bg-to-nothing-right flex items-center">
          <CTABtn
            primary={false}
            extraClasses="h-[150px] mr-2 text-white"
            onClick={() => scrollCarousel()}
          >
            <icons.NextIcon />
          </CTABtn>
        </div>
      </div>
    </section>
  );
};

export default CardList;
