import Image from "next/image";
import Link from "next/link";

interface Props {
  src: string;
  alt: string;
  book_cover?: boolean;
  optimized?: boolean;
  actual?: boolean;
  href?: string;
}

const ImgEl = ({
  src,
  alt,
  book_cover = false,
  optimized = true,
  actual = false,
  href = "/",
}: Props) => {
  let classList = "relative overflow-hidden";

  if (book_cover) {
    classList +=
      " w-[156px] aspect-[10/16] rounded-l-[16px] border border-gray-300";
  } else if (actual) {
    classList +=
      " w-full aspect-square sm:w-[400px] shadow-[0_16px_32px_rgba(0,0,0,0.10)] rounded-[12px]";
  } else {
    classList +=
      " w-[385px] rounded-[16px] aspect-video border border-gray-300";
  }

  const optimizedAttributes = optimized
    ? {
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
        quality: 30,
      }
    : {};

  return (
    <Link href={href} className="block">
      <figure className={classList}>
        <Image
          className={`absolute w-auto h-auto${actual ? " object-contain bg-white" : " object-cover"}`}
          src={src}
          alt={alt}
          fill
          {...optimizedAttributes}
        />
      </figure>
    </Link>
  );
};

export default ImgEl;
