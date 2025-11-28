"use client";

interface Props {
  src: string;
  alt: string;
  width?: number;
}

const Thumbnail = ({ src, alt, width = 500 }: Props) => {
  return (
    <figure style={{ width }}>
      <img src={src} alt={alt} className="aspect-video object-cover" />
    </figure>
  );
};

export default Thumbnail;
