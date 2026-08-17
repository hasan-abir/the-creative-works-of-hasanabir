"use client";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import Image from "next/image";

interface Props {
  item: Painting | Book | Song;
}

const Slide = ({ item }: Props) => {
  return (
    <div className="h-[400px] flex items-end justify-center bg-gray-200">
      <div className="h-80 w-full overflow-hidden flex items-center">
        {Object.keys(item).includes("thumbnail") ? (
          <Image
            className="h-full w-full object-contain"
            width="0"
            height="0"
            sizes="100vw"
            src={(item as Book | Painting).thumbnail}
            alt="random"
          />
        ) : null}
      </div>

      {/* <p className="h-80 w-full text-center p-8 text-3xl font-bold  bg-gray-700 text-light-50 uppercase"> */}
      {/* {item as string} */}
      {/* </p> */}
    </div>
  );
};

export default Slide;
