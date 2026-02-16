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
      <div className="flex mb-12 pb-12 pt-6 px-12 overflow-x-auto">
        {children}
      </div>
    </section>
  );
};

export default CardList;
