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
    classList += " w-[156px] rounded-l-[16px] h-[250px]";
  } else if (actual) {
    classList += "w-auto h-auto max-w-[500px] max-h-[500px]";
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
        className={`border border-gray-500 w-auto h-auto${actual ? " object-contain rounded-[4px]" : " absolute object-cover"}`}
        src={src}
        alt={alt}
        width={actual ? 300 : undefined}
        height={actual ? 300 : undefined}
        fill={!actual}
        {...optimizedAttributes}
      />
    </figure>
  );
};

export default ImgEl;
