"use client";

interface Props {
  src: string;
  alt: string;
}

const Thumbnail = ({ src, alt }: Props) => {
  return (
    <figure style={{ width: 500 }}>
      <img src={src} alt={alt} className="aspect-video object-cover" />
    </figure>
  );
};

export default Thumbnail;
