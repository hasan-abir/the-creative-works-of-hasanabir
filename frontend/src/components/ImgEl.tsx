interface Props {
  src: string;
  alt: string;
}

const ImgEl = ({ src, alt }: Props) => {
  return <img src={src} alt={alt} />;
};

export default ImgEl;
