"use client";

import { Book, Painting, Song } from "@/lib/remark/getContent";
import checkProp from "@/utils/checkProp";

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
    <div style={{ maxWidth: "600px" }} className="mx-auto">
      <h2 className="text-center">{item.title}</h2>
      <p className="text-center">
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
        <p className="text-justify">{(item as Book).content}</p>
      ) : null}
    </div>
  );
};

export default ArtDetail;
