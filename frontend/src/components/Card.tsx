"use client";

import { ReactNode } from "react";
import Thumbnail from "@/components/Thumbnail";

interface Props {
  thumbnailSrc: string;
  title: string;
  published_year: string;
  extraClasses?: string;
  audio?: boolean;
}

const Card = ({
  thumbnailSrc,
  title,
  published_year,
  extraClasses,
  audio = false,
}: Props) => {
  return (
    <article className={"mb-6" + extraClasses ? " " + extraClasses : ""}>
      <p className="text-right">{published_year}</p>
      {audio ? (
        <audio controls>
          <source src={thumbnailSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <Thumbnail src={thumbnailSrc} alt={title} width={350} />
      )}
      <h3>{title}</h3>
    </article>
  );
};

export default Card;
