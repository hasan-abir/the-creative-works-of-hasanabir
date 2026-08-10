"use client";
import Image from "next/image";

interface Props {
  item: unknown;
}

const Slide = ({ item }: Props) => {
  return (
    <div className="h-[400px] flex items-end justify-center">
      <div className="h-80 w-full overflow-hidden flex items-center">
        <Image
          className="h-[300%] w-[300%] object-cover"
          width="0"
          height="0"
          sizes="100vw"
          src={`https://picsum.photos/seed/${item as string}/200/300?grayscale`}
          alt="random"
        />
      </div>

      {/* <p className="h-80 w-full text-center p-8 text-3xl font-bold  bg-gray-700 text-light-50 uppercase"> */}
      {/* {item as string} */}
      {/* </p> */}
    </div>
  );
};

export default Slide;
