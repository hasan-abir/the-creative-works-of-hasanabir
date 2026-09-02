"use client";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";

interface Props {
  item: Painting | Book | Song;
}

const Slide = ({ item }: Props) => {
  const landscape = Object.keys(item).includes("landscape")
    ? (item as Book | Painting).landscape
    : false;

  return (
    <div className="h-[500px] flex items-end justify-center">
      <div
        className="h-full overflow-hidden flex items-center relative"
        style={landscape ? { width: 500 } : { width: 300 }}
      >
        {Object.keys(item).includes("thumbnail") ? (
          <Image
            className="object-contain border-y-2 border-r-2 border-neutral-500 w-full h-auto shadow-lg"
            width={0}
            height={0}
            sizes="100vw"
            src={(item as Book | Painting).thumbnail}
            alt={item.title}
          />
        ) : (
          <div className="bg-dark-50 h-full w-[400px] text-light-50">
            <AudioPlayer song={item as Song} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
