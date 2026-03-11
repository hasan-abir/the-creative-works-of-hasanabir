"use client";

import React, {
  ReactNode,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { headingFont } from "@/utils/fonts";
import { icons } from "@/utils/icons";
import CTABtn from "@/components/CTABtn";

interface Props {
  children: ReactNode;
  heading: string;
}

const CardList = ({ children, heading }: Props) => {
  const [startOfCarousel, setStartOfCarousel] = useState(true);
  const [endOfCarousel, setEndOfCarousel] = useState(true);

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

  const onScroll = useCallback((el: HTMLDivElement) => {
    const percentScrolled =
      ((el.scrollLeft + el.clientWidth) / el.scrollWidth) * 100;

    setStartOfCarousel(el.scrollLeft < 64);
    setEndOfCarousel(percentScrolled > 95);
  }, []);

  useEffect(() => {
    scrollRef.current && onScroll(scrollRef.current);
  }, []);

  return (
    <section>
      <h1 className={headingFont.className + " big-heading"}>{heading}</h1>
      <div className="relative carousel-container">
        <div
          className="carousel-track flex overflow-x-auto mb-12 pb-12 pt-6 px-12"
          ref={scrollRef}
          onScroll={(e) => onScroll(e.target as HTMLDivElement)}
        >
          {children}
        </div>
        <div className="absolute left-0 top-0 bg-light-100 h-full bg-to-nothing-left flex items-center">
          <CTABtn
            primary={false}
            extraClasses={
              "h-[75px] ml-2 bg-light-100 shadow-lg transition-opacity" +
              (startOfCarousel
                ? " opacity-0 cursor-default"
                : " opacity-100 cursor-pointer")
            }
            onClick={() => scrollCarousel(false)}
          >
            <icons.PreviousIcon />
          </CTABtn>
        </div>
        <div
          className={
            "absolute right-0 top-0 bg-light-100 h-full bg-to-nothing-right flex items-center"
          }
        >
          <CTABtn
            primary={false}
            extraClasses={
              "h-[75px] mr-2 bg-light-100 transition-opacity" +
              (endOfCarousel
                ? " opacity-0 cursor-default"
                : "opacity-100 cursor-pointer")
            }
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
