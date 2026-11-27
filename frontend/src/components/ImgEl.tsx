import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  blurUrl: string;
  href?: string;
  fixed?: boolean;
  aspectRatio: string;
}

const ImgEl = ({ src, alt, blurUrl, href, aspectRatio, fixed }: Props) => {
  let containerClassList = "relative mx-auto overflow-x-hidden";

  containerClassList += fixed
    ? " w-[300px] h-[300px] border-2 border-black"
    : " h-[90vh]";

  return (
    <div className={containerClassList} style={{ aspectRatio: aspectRatio }}>
      <Image
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
