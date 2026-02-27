import { ReactNode } from "react";
import { headingFont } from "@/utils/fonts";

interface Props {
  children: ReactNode;
  heading: string;
}

const CardList = ({ children, heading }: Props) => {
  return (
    <section>
      <h1 className={headingFont.className + " big-heading"}>{heading}</h1>
      <div className="relative">
        <div className="flex overflow-x-auto mb-12 pb-12 pt-6 px-12">
          {children}
        </div>
        <div className="absolute left-0 top-0 bg-light-100 w-12 h-full bg-to-nothing-left"></div>
        <div className="absolute right-0 top-0 bg-light-100 w-12 h-full bg-to-nothing-right"></div>
      </div>
    </section>
  );
};

export default CardList;
