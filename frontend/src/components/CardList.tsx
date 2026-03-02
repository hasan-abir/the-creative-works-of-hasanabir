"use client";

import { ReactNode, useCallback, useState, useRef } from "react";
import { headingFont } from "@/utils/fonts";

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();

    if (!scrollRef.current) return;

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section>
      <h1 className={headingFont.className + " big-heading"}>{heading}</h1>
      <div className="relative carousel-container">
        <div
          className={`carousel-track flex overflow-x-auto mb-12 pb-12 pt-6 px-12${isDragging ? " cursor-grabbing" : ""}`}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
        >
          {children}
        </div>
        <div className="absolute left-0 top-0 bg-light-100 w-12 h-full bg-to-nothing-left"></div>
        <div className="absolute right-0 top-0 bg-light-100 w-12 h-full bg-to-nothing-right"></div>
      </div>
    </section>
  );
};

export default CardList;
