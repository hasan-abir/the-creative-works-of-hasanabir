import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  book_cover?: boolean;
  optimized?: boolean;
  actual?: boolean;
}

const ImgEl = ({
  src,
  alt,
  book_cover = false,
  optimized = true,
  actual = false,
}: Props) => {
  let classList = "relative overflow-hidden";

  if (book_cover) {
    classList += " w-[156px] rounded-l-[16px] h-[250px] border border-gray-500";
  } else if (actual) {
    classList +=
      " w-[400px] h-[400px] shadow-[0_16px_32px_rgba(0,0,0,0.10)] rounded-[12px]";
  } else {
    classList += " w-[385px] rounded-[16px] h-[250px] border border-gray-500";
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
        className={`absolute w-auto h-auto${actual ? " object-contain bg-white" : " object-cover"}`}
        src={src}
        alt={alt}
        fill
        {...optimizedAttributes}
      />
    </figure>
  );
};

export default ImgEl;
