import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  blurUrl: string;
  href?: string;
  fixed?: boolean;
}

const ImgEl = ({ src, alt, blurUrl, href, fixed }: Props) => {
  let containerClassList = "relative mx-auto overflow-hidden";

  containerClassList += fixed
    ? " w-[300px] h-[300px] border-2 border-black"
    : " w-[500px] h-[500px]";

  return (
    <div className={containerClassList}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 430px) 80vw, (max-width: 768px) 60vw, (max-width: 1200px) 40vw, 30vw"
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurUrl}
        objectFit={fixed ? "cover" : "contain"}
      />
    </div>
  );
};

export default ImgEl;
