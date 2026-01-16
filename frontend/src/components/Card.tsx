"use client";

import React, { ReactNode } from "react";
import Thumbnail from "@/components/Thumbnail";

interface Props {
  children: React.ReactNode;
  extraClasses?: string;
}

const Card = ({ children, extraClasses }: Props) => {
  let classList =
    "mr-4 size-fit bg-white rounded-3xl p-2 min-h-[250px] shadow-[0_16px_32px_rgba(0,0,0,0.10)]";

  if (extraClasses) {
    classList += " " + extraClasses;
  }

  return <article className={classList}>{children}</article>;
};

export default Card;
