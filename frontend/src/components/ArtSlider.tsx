"use client";

import Slide from "@/components/Slide";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {}

const ArtSlider = ({}: Props) => {
  const [active, setActive] = useState<number>(5);
  const container = useRef<HTMLDivElement>(null);
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  // const sliderWrapper = useRef<HTMLDivElement>(null);
  // const [startPageX, setStartX] = useState(0);
  // const [scrollLeft, setScrollLeft] = useState(0);

  // useEffect(() => {
  //   console.log(sliderWrapper.current);
  // }, []);

  // const startDrag = useCallback((e: React.MouseEvent) => {
  //   setIsDragging(true);
  //   console.log("started drag");
  //   if (sliderWrapper.current) {
  //     setStartX(e.pageX - sliderWrapper.current.offsetLeft);
  //     setScrollLeft(sliderWrapper.current.scrollLeft);
  //   }
  // }, []);

  // const stopDrag = useCallback(() => {
  //   if (isDragging) {
  //     setIsDragging(false);
  //     console.log("stopped drag");
  //   }
  // }, [isDragging]);

  // const moveDrag = useCallback(
  //   (e: React.MouseEvent) => {
  //     e.preventDefault();

  //     if (isDragging && sliderWrapper.current) {
  //       // console.log("dragging - pageX: ", e.pageX);
  //       // console.log("wrapper scrollLeft: ", sliderWrapper.current.scrollLeft);

  //       const speed = 1.5;
  //       // Drag from where clicked
  //       const scrollDragged =
  //         (startPageX - (e.pageX - sliderWrapper.current.offsetLeft)) * speed;

  //       if (e.pageX <= sliderWrapper.current.offsetLeft + 10) {
  //         stopDrag();
  //       } else {
  //         sliderWrapper.current.scrollLeft = scrollLeft + scrollDragged;
  //         console.log(
  //           `startPageX: ${startPageX}`,
  //           `pageX: ${e.pageX}`,
  //           `offsetLeft: ${sliderWrapper.current.offsetLeft}`,
  //           `scrollLeft: ${sliderWrapper.current.scrollLeft}`,
  //         );
  //       }
  //     }
  //   },
  //   [isDragging, scrollLeft, startPageX],
  // );
  useGSAP(
    () => {
      gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);
      console.log("hello");
    },
    { scope: container },
  );
  return (
    // <section
    //   ref={sliderWrapper}
    //   className="overflow-x-scroll cursor-grab"
    //   onMouseDown={startDrag}
    //   onMouseUp={stopDrag}
    //   onMouseLeave={stopDrag}
    //   onMouseMove={moveDrag}
    // >
    <section className="overflow-hidden h-[430px] relative" ref={container}>
      <div className="flex justify-center items-end w-max absolute top-0 left-1/2 translate-x-[-50%]">
        {Array.from({ length: 10 }).map((_, i) => (
          <Slide key={i} onClick={() => setActive(i)} isActive={active === i} />
        ))}
      </div>
    </section>
  );
};

export default ArtSlider;
