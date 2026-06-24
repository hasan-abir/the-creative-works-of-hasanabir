"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArtSliderMarkup from "@/components/ArtSlider/markup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ArtSlider = () => {
  const container = useRef<HTMLDivElement>(null);
  const originalArtArray = Array.from("planet");
  const [inQue, setQue] = useState<unknown | null>(null);
  const [itemArr, setItemArr] = useState<unknown[]>([]);

  const activeItem = useMemo(() => {
    return Math.ceil(itemArr.length / 2 - 1);
  }, [itemArr]);

  useEffect(() => {
    const ogArrDupe = [...originalArtArray];

    if (ogArrDupe.length % 2 === 0) {
      const lastItem = ogArrDupe.pop();
      setQue(lastItem);
      console.log(lastItem);
    }
    setItemArr(ogArrDupe);
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
          onComplete: () => {
            if (right) {
              setItemArr((arr) => {
                const updatedArr = [...arr];
                const firstItem = updatedArr.slice(1, updatedArr.length - 1);

                setQue(firstItem);

                return updatedArr;
              });
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
