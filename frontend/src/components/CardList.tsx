import { ReactNode } from "react";
import { workSans } from "@/app/layout";

interface Props {
  children: ReactNode;
  heading: string;
}

const CardList = ({ children, heading }: Props) => {
  return (
    <section className="overflow-x-auto">
      <h1 className={workSans.className + " font-black"}>{heading}</h1>
      <div className="flex mb-12">{children}</div>
    </section>
  );
};

export default CardList;
