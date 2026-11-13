import { Book, Painting, Song } from "@/lib/remark/getContent";
import "swiper/css";
import fs from "node:fs/promises";
import Link from "next/link";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

interface Props {
  item: Book | Painting | Song;
}

const EachItem = async ({ item }: Props) => {
  // Do this server side
  const imgSrc = (item as Book).cover_image || (item as Painting).thumbnail;

  const file = await fs.readFile(`./public${imgSrc}`);

  const { base64 } = await getPlaiceholder(file);

  return (
    <div className="bg-white w-[400px] h-[500px] text-center p-8">
      {imgSrc ? (
        <div className="w-[300px] h-[300px] relative overflow-y-hidden mx-auto border-2 border-black">
          <Image
            src={imgSrc}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 430px) 80vw, (max-width: 768px) 60vw, (max-width: 1200px) 40vw, 30vw"
            placeholder="blur"
            blurDataURL={base64}
          />
        </div>
      ) : null}

      <Link href={`/work/${item.path}/`} className="mt-8">
        {item.title}
      </Link>
    </div>
  );
};

export default EachItem;
