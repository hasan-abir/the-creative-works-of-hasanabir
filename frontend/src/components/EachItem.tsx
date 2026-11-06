"use client";

import { Book, Painting, Song } from "@/lib/remark/getContent";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  item: Book | Painting | Song;
}

const EachItem = ({ item }: Props) => {
  const imgSrc =
    (item as Book).cover_image || (item as Painting).thumbnail || null;

  return (
    <div className="bg-white w-[400px] h-[500px] text-center p-8">
      {imgSrc ? (
        <div className="w-[300px] h-[300px] relative mx-auto border-2 border-black">
          <Image src={imgSrc} alt={item.title} fill objectFit="cover" />
        </div>
      ) : null}

      <Link href={`/work/${item.path}/`} className="mt-8">
        {item.title}
      </Link>
    </div>
  );
};

export default EachItem;
