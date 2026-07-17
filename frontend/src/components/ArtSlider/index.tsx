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
    const calculateDim = () => {
      moveSlider(true, true);
    };

    if (itemArr.length > 0) {
      calculateDim();
    } else {
      const ogArrDupe = [...originalArtArray];
      const newArr = [...ogArrDupe, ...ogArrDupe];

      setItemArr(newArr);
    }

    window.addEventListener("resize", calculateDim);

    // 5. CRITICAL: Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", calculateDim);
    };
  }, [itemArr]);

  gsap.registerPlugin(useGSAP);

  const { contextSafe } = useGSAP(
    () => {
      // const tl = gsap.timeline();
      // tl.to(".slider", {
      //   xPercent: -50,
      //   ease: "none",
      //   duration: 10,
      //   repeat: -1,
      // });
      // Move the whole slider by a slide's width + horizontal margins
      // Put the spliced item to a que. And append or prepend to whichever direction we are going. Splice after every move
    },
    { scope: container },
  );

  const moveSlider = contextSafe(
    useCallback(
      (right?: boolean, instant?: boolean) => {
        const indexChange = instant ? 0 : right ? 1 : -1;
        const halfOfSlide = 100;

        const currentItem = itemArr[
          itemArr.findIndex((item) => item === activeItem) + indexChange
        ] as string;
        setActiveItem(currentItem);

        const newActiveSlide = gsap.utils.toArray<HTMLDivElement>(
          `.slide-${currentItem}`,
        )[1];

        const q = gsap.utils.selector(container);
        const slider = q<HTMLDivElement>(".slider")[0];
        let halfSliderContWidth = container.current?.offsetWidth || 0;
        halfSliderContWidth = halfSliderContWidth / 2;
        const moveX =
          -newActiveSlide.offsetLeft + halfSliderContWidth - halfOfSlide;

        if (instant) {
          gsap.set(slider, { x: moveX });
        } else {
          gsap.to(slider, {
            x: moveX,
            ease: "circ.inOut",
          });
        }
      },
      [inQue, activeItem, itemArr],
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
