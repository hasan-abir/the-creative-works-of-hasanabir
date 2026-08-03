"use client";

interface Props {
  item: unknown;
}

const Slide = ({ item }: Props) => {
  return (
    <div className="h-[50vh] flex items-end">
      <p className="h-80 w-full text-center p-8 text-3xl font-bold  bg-gray-700 text-light-50 uppercase">
        {item as string}
      </p>
    </div>
  );
};

export default Slide;
