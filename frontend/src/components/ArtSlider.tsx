"use client";

import Slide from "@/components/Slide";
import { useState } from "react";

interface Props {}

const ArtSlider = ({}: Props) => {
  const [active, setActive] = useState<number>(5);

  return (
    <section>
      {/* Sllider */}
      <div className="flex justify-center items-end">
        {/* Slide Element */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Slide key={i} onClick={() => setActive(i)} isActive={active === i} />
        ))}
      </div>
    </section>
  );
};

export default ArtSlider;
