"use client";

import CategoriesList from "@/components/CategoriesList";
import { headingFont } from "@/utils/fonts";

interface Props {}

const HomeHero = ({}: Props) => {
  return (
    <section>
      <h1
        className={
          headingFont.className +
          " uppercase tracking-[-6%] text-[4rem] text-center leading-[0.75]"
        }
      >
        hasan abir
      </h1>
      <p className="uppercase flex justify-center text-2xl tracking-[-5%] mb-6">
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
