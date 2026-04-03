"use client";

import React, { ReactNode } from "react";

interface Props {
  children: React.ReactNode;
  extraClasses?: string;
  fullWidth?: boolean;
}

const Card = ({ children, extraClasses, fullWidth = false }: Props) => {
  let classList =
    "mr-4 size-fit bg-white rounded-3xl p-2 aspect-[3/2] shadow-[0_16px_32px_rgba(0,0,0,0.10)]";

  classList += fullWidth ? " w-full" : " w-auto";

  if (extraClasses) {
    classList += " " + extraClasses;
  }

  return <article className={classList}>{children}</article>;
};

export default Card;
