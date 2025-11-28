"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CardList = ({ children }: Props) => {
  return <div className="flex mb-12">{children}</div>;
};

export default CardList;
