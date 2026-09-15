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
    <div className="mt-16">
      <h2
        className={headingFont.className + " text-center uppercase text-[4rem]"}
      >
        <span>{item.title}</span>
        <br />
        <br />
        <span className="text-neutral-200">{item.title}</span>
      </h2>
      <p className="text-center my-8">
        <span>
          {checkProp(item, "date_created") ? "Finished at " : "Published at "}
        </span>
        <span>
          {fromDateToStr(
            (item as Song | Painting).date_created ||
              (item as Book).published_date,
          )}
        </span>
      </p>
      {checkProp(item, "content") ? (
        <p
          className="text-justify text-neutral-400 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          {(item as Book).content}
        </p>
      ) : null}
    </div>
  );
};

export default ArtDetail;
