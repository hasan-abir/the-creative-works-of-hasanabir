"use client";

import { ReactNode, useCallback, useState, useRef } from "react";
import { headingFont } from "@/utils/fonts";
import CTABtn from "@/components/CTABtn";

interface Props {
  children: ReactNode;
  heading: string;
}

const CardList = ({ children, heading }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);
  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();

      if (!scrollRef.current) return;

      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [scrollRef.current?.offsetLeft, startX],
  );

  return (
    <section>
      <h1 className={headingFont.className + " big-heading"}>{heading}</h1>
      <div className="relative carousel-container">
        <div
          className="carousel-track flex overflow-x-auto mb-12 pb-12 pt-6 px-12"
          ref={scrollRef}
          // onMouseDown={handleMouseDown}
          // onMouseOut={handleMouseUpOrLeave}
          // onMouseUp={handleMouseUpOrLeave}
          // onMouseMove={handleMouseMove}
        >
          {children}
        </div>
        <div className="absolute left-0 top-0 bg-light-100 w-12 h-full bg-to-nothing-left flex items-center">
          <CTABtn primary={false} extraClasses="h-[150px]">
            👈
          </CTABtn>
        </div>
        <div className="absolute right-0 top-0 bg-light-100 w-12 h-full bg-to-nothing-right flex items-center">
          <CTABtn primary={false} extraClasses="h-[150px]">
            👉
          </CTABtn>
        </div>
      </div>
    </section>
  );
};

export default CardList;
