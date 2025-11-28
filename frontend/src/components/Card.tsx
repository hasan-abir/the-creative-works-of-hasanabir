"use client";

import { ReactNode } from "react";
import Thumbnail from "@/components/Thumbnail";

interface Props {
  thumbnailSrc: string;
  title: string;
  published_year: string;
  extraClasses?: string;
}

const Card = ({ thumbnailSrc, title, published_year, extraClasses }: Props) => {
  return (
    <article className={"mb-6" + extraClasses ? " " + extraClasses : ""}>
      <p className="text-right">{published_year}</p>
      <Thumbnail src={thumbnailSrc} alt={title} width={350} />
      <h3>{title}</h3>
    </article>
  );
};

export default Card;
