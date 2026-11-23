import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  blurUrl: string;
  href?: string;
  fixed?: boolean;
}

const ImgEl = ({ src, alt, blurUrl, href, fixed }: Props) => {
  const landscape = true;
  let containerClassList = "relative mx-auto overflow-hidden";

  containerClassList += fixed
    ? " w-[300px] h-[300px] border-2 border-black"
    : landscape
      ? " w-4/5 h-[95dvh]"
      : "";

  return (
    <div className={containerClassList}>
      <Image
        className="aspect-video"
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 430px) 80vw, (max-width: 768px) 60vw, (max-width: 1200px) 40vw, 30vw"
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurUrl}
        objectFit="cover"
      />
    </div>
  );
};

export default ImgEl;
