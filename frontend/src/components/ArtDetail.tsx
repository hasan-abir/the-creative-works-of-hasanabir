"use client";

import { Book, Painting, Song } from "@/lib/remark/getContent";
import checkProp from "@/utils/checkProp";
import { headingFont } from "@/utils/fonts";

interface Props {
  item: Painting | Book | Song;
}

const fromDateToStr = (date: Date) => {
  const months = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const fullStr = `${months[date.getMonth()]} ${date.getFullYear().toString()}`;
  return fullStr;
};

const ArtDetail = ({ item }: Props) => {
  return (
    <div className="mb-16 centered-container">
      <h2 className="uppercase text-4xl">{item.title}</h2>
      <p>
        {"date_created" in item
          ? "Created in " +
            fromDateToStr((item as Song | Painting).date_created)
          : "Published in " + fromDateToStr((item as Book).published_date)}
      </p>
      {/* {checkProp(item, "content") ? (
        <p
          className="text-justify text-neutral-400 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          {(item as Book).content}
        </p>
      ) : null} */}
    </div>
  );
};

export default ArtDetail;
