"use client";

import { useMemo, useRef } from "react";
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

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      // Move the whole slider by a slide's width + horizontal margins
    },
    { scope: container },
  );
  return <ArtSliderMarkup refObj={container} artArray={artArray} />;
};

export default ArtSlider;
