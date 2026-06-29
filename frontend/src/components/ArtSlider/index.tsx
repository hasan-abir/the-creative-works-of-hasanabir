"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArtSliderMarkup from "@/components/ArtSlider/markup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ArtSlider = () => {
  const container = useRef<HTMLDivElement>(null);
  const originalArtArray = Array.from("planet");
  const [inQue, setQue] = useState<unknown | null>(null);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [itemArr, setItemArr] = useState<unknown[]>([]);

  const calActiveItem = useCallback(() => {
    setActiveItem(Math.ceil(itemArr.length / 2 - 1));
  }, [itemArr.length]);

  useEffect(() => {
    const ogArrDupe = [...originalArtArray];

    setItemArr(ogArrDupe.concat(ogArrDupe.slice(0, -1)));
    calActiveItem();
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

          // onComplete: () => {
          //   if (right) {
          //     setItemArr((arr) => {
          //       const updatedArr = [...arr, ...arr.slice(0, -1)];
          //       const firstItem = updatedArr.shift();

          //       setQue(firstItem);

          //       if (inQue) {
          //         updatedArr.push(inQue);
          //       }

          //       return updatedArr;
          //     });
          //   } else {
          //     setItemArr((arr) => {
          //       const updatedArr = [...arr];
          //       const lastItem = updatedArr.pop();

          //       setQue(lastItem);

          //       if (inQue) {
          //         updatedArr.unshift(inQue);
          //       }

          //       return updatedArr;
          //     });
          //   }
          //   calActiveItem();
          // },
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
