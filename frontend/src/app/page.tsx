import Link from "next/link";
import { Marcellus_SC } from "next/font/google";
import CTALink from "@/components/CTALink";
import Image from "next/image";
const marcellusSC = Marcellus_SC({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="min-h-screen py-10 px-6 sm:px-8 flex justify-center">
      <div className="max-w-5xl w-full h-hull flex flex-col items-start">
        <div className="h-[2px] shrink-0 w-1/2 bg-dark-300 dark:bg-light-100 mb-6 sm:mb-12"></div>
        <section className="w-full sm:w-3/4 mx-auto h-full flex flex-col justify-center">
          <h1 className={marcellusSC.className + " uppercase leading-none"}>
            <span className="text-2xl sm:text-[4rem]">art pieces by</span>
            <span className="block text-4xl sm:text-8xl">hasan abir</span>
          </h1>
          <p className="opacity-70 sm:text-center sm:mx-auto my-4 sm:my-6 max-w-[350px] text-sm sm:text-lg">
            Take a dive into this creative collection that I&apos;ve been
            inspired to make.
          </p>
          <section className="flex flex-col items-start justify-between sm:flex-row">
            <div className="mt-10 mr-0 sm:mr-4 order-last sm:order-first relative before:content-[''] before:z-[-1000] before:absolute before:top-full before:left-0 before:w-12 before:h-12 before:sm:w-24 before:sm:h-24 before:border-2 before:border-dark-300 before:dark:border-light-100 before:translate-x-[-20%]  before:translate-y-[-80%] ">
              <Image
                src={"/ducks.webp"}
                alt="Quack"
                width="450"
                height="250"
                className="max-h-[250px]"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <CTALink href="/stories" text="Short Stories" />
          </section>
        </section>
        <div className="h-[2px] shrink-0 ml-auto w-1/2 bg-dark-300 dark:bg-light-100 mt-6 sm:mt-12"></div>
      </div>
    </main>
  );
}
