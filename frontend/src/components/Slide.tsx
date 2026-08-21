"use client";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import Image from "next/image";

interface Props {
  item: Painting | Book | Song;
}

const Slide = ({ item }: Props) => {
  return (
    <div className="h-[400px] flex items-end justify-center">
      <div className="h-full overflow-hidden flex items-center opacity-50">
        {Object.keys(item).includes("thumbnail") ? (
          <Image
            className="h-full w-auto object-contain"
            width="0"
            height="0"
            sizes="100vw"
            src={(item as Book | Painting).thumbnail}
            alt="random"
          />
        ) : (
          <div className="bg-gray-700 h-full w-[200px] text-light-50">
            {item.title}
          </div>
        )}
      </div>

      {/* <p className="h-80 w-full text-center p-8 text-3xl font-bold  bg-gray-700 text-light-50 uppercase"> */}
      {/* {item as string} */}
      {/* </p> */}
    </div>
  );
};

export default Slide;
