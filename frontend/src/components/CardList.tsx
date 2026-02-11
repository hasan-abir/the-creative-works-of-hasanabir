import { ReactNode } from "react";
import { workSans } from "@/app/layout";

interface Props {
  children: ReactNode;
  heading: string;
}

const CardList = ({ children, heading }: Props) => {
  return (
    <section>
      <h1 className={workSans.className + " big-heading"}>{heading}</h1>
      <div className="flex mb-12 pb-12 pt-6 px-12 overflow-x-auto">
        {children}
      </div>
    </section>
  );
};

export default CardList;
