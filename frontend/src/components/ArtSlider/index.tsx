"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArtSliderMarkup from "@/components/ArtSlider/markup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ArtSlider = () => {
  const container = useRef<HTMLDivElement>(null);
  const originalArtArray = Array.from("pay");
  const [inQue, setQue] = useState<unknown | null>(null);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [itemArr, setItemArr] = useState<unknown[]>([]);

  useEffect(() => {
    const ogArrDupe = [...originalArtArray];
    const newArr = [...ogArrDupe.slice(1), ...ogArrDupe];

    setItemArr(newArr);
    const middlePoint = newArr.length / 2;

    setActiveItem(Math.ceil(middlePoint - 1));
    setQue(ogArrDupe[0]);
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
        const val = 208;
        let x = right ? `-=${val}` : `+=${val}`;

        gsap.to(".slider", {
          x,
          ease: "circ.inOut",
          // NOTE: KEEP TRACK OF WHICH ELEMENT IS FOCUSED and where it is on the track. If it is near the end of the track, add copies of the item. Also keep track of which copies

          onComplete: () => {
            if (right) {
              setActiveItem((val) => val + 1);
              // DUPLICATE ARRAY AND LOOP

              // setItemArr((arr) => {
              //   arr = [...arr, inQue];

              //   return arr.slice(1);
              // });
            } else {
              setActiveItem((val) => val - 1);
              // setItemArr((arr) => {
              //   const updatedArr = [...arr];
              //   const lastItem = updatedArr.pop();
              //   setQue(lastItem);
              //   if (inQue) {
              //     updatedArr.unshift(inQue);
              //   }
              //   return updatedArr;
              // });
            }
          },
        });
      },
      [inQue],
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
