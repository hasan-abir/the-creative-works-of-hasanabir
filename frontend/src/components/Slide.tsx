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
  thumbnailContainer += active ? "w-[70vh] h-[70vh]" : "w-[30vh] h-[30vh]";
  thumbnailContainer += " transition-all duration-500";

  return (
    <div className="w-[700px] h-[70vh] flex justify-center items-center">
      <div className={thumbnailContainer}>
        <figure
          className="w-[70vh] h-[70vh] bg-contain bg-no-repeat bg-center bg-local absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          style={{
            backgroundImage: `url(${(item as Book | Painting).thumbnail})`,
          }}
        ></figure>
        {/* <Image
          className="object-contain w-[70vh] h-[70vh] max-w-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          width={0}
          height={0}
          sizes="100vw"
          src={(item as Book | Painting).thumbnail}
          alt={item.title}
        /> */}
      </div>
    </div>
  );
};

export default Slide;
