"use client";
import Thumbnail from "@/components/Thumbnail";
import { Content } from "@/utils/content";

interface Props {
  content: Content;
}

const TodaysHighlight = ({ content }: Props) => {
  return (
    <article className="flex mb-12">
      <Thumbnail src={content.thumbnailSrc} alt={content.title} />
      <div className="card-head flex-1 ml-8">
        <h2>
          {content.title} <span>({content.published_year})</span>
        </h2>
        <p>
          A <span className="font-bold capitalize">{content.type}</span> by{" "}
          <span className="font-bold">Hasan Abir</span>
        </p>
      </div>
    </article>
  );
};

export default TodaysHighlight;
