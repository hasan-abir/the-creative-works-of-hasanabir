"use client";

import { Book, Painting, Song } from "@/lib/remark/getContent";

interface Props {
  item: Painting | Book | Song;
}

const ArtDetail = ({ item }: Props) => {
  return (
    <div>
      <h2>{item.title}</h2>
      {/* <p>{JSON.stringify(item)}</p> */}
      <p>
        {JSON.stringify(
          (item as Song | Painting).date_created ||
            (item as Book).published_date,
        )}
      </p>
      {Object.keys(item).includes("content") ? (
        <p>{(item as Book).content}</p>
      ) : null}
    </div>
  );
};

export default ArtDetail;
