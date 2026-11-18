import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  blur_url: string;
  href?: string;
}

const ImgEl = ({ src, alt, blur_url, href }: Props) => {
  return (
    <div className="w-[300px] h-[300px] relative overflow-y-hidden mx-auto border-2 border-black">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 430px) 80vw, (max-width: 768px) 60vw, (max-width: 1200px) 40vw, 30vw"
        loading="lazy"
        placeholder="blur"
        blurDataURL={blur_url}
      />
    </div>
  );
};

export default ImgEl;
