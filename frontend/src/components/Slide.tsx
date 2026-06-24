"use client";

interface Props {
  onClick?: () => void;
  isActive?: boolean;
  item: unknown;
}

const Slide = ({ onClick, isActive, item }: Props) => {
  return (
    <div
      className={`${isActive ? "bg-red-500" : "bg-dark-50"} slide w-[200px] h-[350px] text-light-50 mx-1 flex-shrink-0 pointer-events-none flex justify-center uppercase`}
      onClick={onClick}
    >
      {item as string}
    </div>
  );
};

export default Slide;
