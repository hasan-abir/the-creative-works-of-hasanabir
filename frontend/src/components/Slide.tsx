"use client";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";
import checkProp from "@/utils/checkProp";

interface Props {
  item: Painting | Book | Song;
  active: boolean;
}

const Slide = ({ item, active }: Props) => {
  const landscape = Object.keys(item).includes("landscape")
    ? (item as Book | Painting).landscape
    : false;
  let thumbnailContainer = "overflow-hidden relative ";
  thumbnailContainer += active ? "w-[600px] h-[600px]" : "w-[300px] h-[300px]";
  thumbnailContainer += " transition-all duration-1000";

  return (
    <div className="w-[600px] h-[600px] flex justify-center items-center">
      <div className={thumbnailContainer}>
        <Image
          className="object-contain w-[600px] h-[600px] max-w-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          width={0}
          height={0}
          sizes="100vw"
          src={(item as Book | Painting).thumbnail}
          alt={item.title}
        />
      </div>
      {/* <div
        className="h-full overflow-hidden flex items-center relative"
        style={landscape ? { width: 500 } : { width: 300 }}
      >
        {checkProp(item, "thumbnail") ? (
          <Image
            className="object-contain border-y-2 border-r-2 border-neutral-500 w-full h-auto"
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
      </div> */}
    </div>
  );
};

export default Slide;
