"use client";

import CTABtn from "@/components/CTABtn";
import CategoriesList from "@/components/CategoriesList";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import React, { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { icons } from "@/utils/icons/";
import { headingFont } from "@/utils/fonts";

interface Props {}

const HomeHero = ({}: Props) => {
  return (
    <section className="page-container w-full sm:absolute sm:top-0 sm:left-[50%] sm:translate-x-[-50%] sm:pointer-events-none">
      <h1
        className={
          headingFont.className +
          " uppercase tracking-[-6%] text-[4rem] text-center"
        }
      >
        hasan abir
      </h1>
      <p className="uppercase flex justify-center text-2xl tracking-[-5%]">
        <span className="text-light-100">his</span>
        <span className="mx-2">art</span>
        <span className="text-light-100">&</span>
        <span className="mx-2">literature</span>
      </p>

      <CategoriesList />
    </section>
  );
};

export default HomeHero;
