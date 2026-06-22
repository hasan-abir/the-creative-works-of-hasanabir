"use client";

import { useCallback, useMemo, useRef } from "react";
import ArtSliderMarkup from "@/components/ArtSlider/markup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ArtSlider = () => {
  const container = useRef<HTMLDivElement>(null);
  const originalArtArray = Array.from({ length: 8 });
  const artArray = useMemo(() => {
    if (originalArtArray.length % 2 === 0) {
      return originalArtArray.slice(0, -1);
    } else {
      return originalArtArray;
    }
  }, []);
  const activeItem = useMemo(() => {
    return Math.ceil(artArray.length / 2 - 1);
  }, [artArray]);

  gsap.registerPlugin(useGSAP);

  const { contextSafe } = useGSAP(
    () => {
      // Move the whole slider by a slide's width + horizontal margins
      // Put the spliced item to a que. And append or prepend to whichever direction we are going. Splice after every move
    },
    { scope: container },
  );

  const moveSlider = contextSafe(
    useCallback((right?: boolean) => {
      const val = 208;

      const x = right ? `-=${val}` : `+=${val}`;

      gsap.to(".slider", {
        x,
        ease: "circ.inOut",
      });
    }, []),
  );

  return (
    <ArtSliderMarkup
      activeItem={activeItem}
      refObj={container}
      artArray={artArray}
      moveSlider={moveSlider}
    />
  );
};

export default ArtSlider;
