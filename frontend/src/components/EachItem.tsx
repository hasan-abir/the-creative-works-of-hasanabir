import { Book, Painting, Song } from "@/lib/remark/getContent";
import ImgEl from "@/components/ImgEl";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

interface Props {
  item: Book | Painting | Song;
}

const EachItem = async ({ item }: Props) => {
  const imgSrc = (item as Book).cover_image || (item as Painting).thumbnail;
  const imgBlur = (item as Book).blurUrl || (item as Painting).blurUrl;

  return (
    <div className="bg-white w-[400px] h-[500px] text-center p-8">
      {imgSrc ? (
        <ImgEl
          src={imgSrc}
          alt={item.title}
          blurUrl={imgBlur}
          fixed
          aspectRatio="1/1"
        />
      ) : null}

      <Link href={`/work/${item.path}/`} className="mt-8">
        {item.title}
      </Link>
    </div>
  );
};

export default EachItem;
