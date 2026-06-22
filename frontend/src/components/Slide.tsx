"use client";

interface Props {
  onClick?: () => void;
  isActive?: boolean;
  index: number;
}

const Slide = ({ onClick, isActive, index }: Props) => {
  return (
    <div
      className={`${isActive ? "bg-red-500" : "bg-dark-50"} slide w-[200px] h-[350px] text-light-50 mx-1 flex-shrink-0 pointer-events-none`}
      onClick={onClick}
    >
      Slide: {index}
    </div>
  );
};

export default Slide;
