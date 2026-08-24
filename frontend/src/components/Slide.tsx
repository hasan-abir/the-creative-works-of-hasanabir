"use client";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";

interface Props {
  item: Painting | Book | Song;
}

const Slide = ({ item }: Props) => {
  return (
    <div className="h-[400px] flex items-end justify-center bg-dark-50">
      <div className="h-full overflow-hidden flex items-center opacity-30">
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
          <div className="bg-dark-50 h-full w-[400px] text-light-50">
            <AudioPlayer song={item as Song} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
