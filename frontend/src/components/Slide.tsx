"use client";

interface Props {
  onClick?: () => void;
  isActive?: boolean;
}

const Slide = ({ onClick, isActive }: Props) => {
  return (
    <div
      className="slide w-[200px] h-[350px] bg-dark-50 text-light-50 mx-1 flex-shrink-0 pointer-events-none"
      // className={`${isActive ? "w-[270px] h-[430px]" : "w-[200px] h-[350px] "} bg-dark-50 text-light-50 mx-1 flex-shrink-0 pointer-events-none`}
      onClick={onClick}
    ></div>
  );
};

export default Slide;
