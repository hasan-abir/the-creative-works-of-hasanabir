import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  book_cover?: boolean;
  optimized?: boolean;
}

const ImgEl = ({ src, alt, book_cover = false, optimized = true }: Props) => {
  let classList = "relative  border overflow-hidden border-gray-500";

  if (book_cover) {
    classList += " w-[156px] rounded-l-[16px] h-[250px]";
  } else {
    classList += " w-[385px] rounded-[16px] h-[250px]";
  }

  const optimizedAttributes = optimized
    ? {
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
        quality: 30,
      }
    : {};

  return (
    <figure className={classList}>
      <Image
        className="w-full h-full absolute object-cover"
        src={src}
        alt={alt}
        fill
        {...optimizedAttributes}
      />
    </figure>
  );
};

export default ImgEl;
