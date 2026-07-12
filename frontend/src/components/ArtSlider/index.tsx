"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArtSliderMarkup from "@/components/ArtSlider/markup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ArtSlider = () => {
  const container = useRef<HTMLDivElement>(null);
  const originalArtArray = Array.from("planet");
  const [inQue, setQue] = useState<unknown | null>(null);
  const [activeItem, setActiveItem] = useState<string>("p");
  const [itemArr, setItemArr] = useState<unknown[]>([]);

  useEffect(() => {
    const ogArrDupe = [...originalArtArray];
    const newArr = [...ogArrDupe, ...ogArrDupe];

    setItemArr(newArr);

    // const middlePoint = newArr.length / 2;

    // setActiveItem(newArr[Math.ceil(middlePoint - 1)]);
    // setQue(ogArrDupe[0]);
  }, []);

  gsap.registerPlugin(useGSAP);

  const { contextSafe } = useGSAP(
    () => {
      // Move the whole slider by a slide's width + horizontal margins
      // Put the spliced item to a que. And append or prepend to whichever direction we are going. Splice after every move
    },
    { scope: container },
  );

  const moveSlider = contextSafe(
    useCallback(
      (right?: boolean) => {
        const activeSlide = gsap.utils.toArray<HTMLDivElement>(
          `.slide-${activeItem}`,
        )[1];

        const q = gsap.utils.selector(container);
        const slider = q<HTMLDivElement>(".slider")[0];
        let centerSliderWidth = container.current?.offsetWidth || 0;
        centerSliderWidth = centerSliderWidth / 2;
        const activeSlideOffset = activeSlide.offsetLeft;

        console.log(activeSlideOffset, centerSliderWidth);

        gsap.to(slider, { x: -activeSlideOffset + centerSliderWidth - 100 });

        const val = 208;
        let x = right ? `-=${val}` : `+=${val}`;

        // gsap.to(".slider", {
        //   x,
        //   ease: "circ.inOut",
        //   onComplete: () => {
        //     if (right) {
        //     } else {
        //     }
        //   },
        // });
      },
      [inQue, activeItem],
    ),
  );

  return (
    <ArtSliderMarkup
      activeItem={activeItem}
      refObj={container}
      itemArr={itemArr}
      moveSlider={moveSlider}
    />
  );
};

export default ArtSlider;
