interface Props {
  src: string;
  alt: string;
  book_cover?: boolean;
}

const ImgEl = ({ src, alt, book_cover = false }: Props) => {
  let classList = "";

  if (book_cover) {
    classList +=
      "max-w-fit rounded-l-[16px] h-[250px] border overflow-hidden border-gray-500";
  }

  return <img className={classList} src={src} alt={alt} />;
};

export default ImgEl;
