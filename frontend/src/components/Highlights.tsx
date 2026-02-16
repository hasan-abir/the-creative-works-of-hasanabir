"use client";

import { useSearchParams } from "next/navigation";
import { headingFont } from "@/utils/fonts";
import ImgEl from "@/components/ImgEl";
import CTABtn from "@/components/CTABtn";

interface Props {}

const Highlights = ({}: Props) => {
  const searchParams = useSearchParams();

  const contentFolder = searchParams.get("highlight");

  return (
    <section>
      <p>{contentFolder}</p>
      <h1 className={headingFont.className + " big-heading"}>
        Today's Highlight
      </h1>
      <div className="flex mb-12 pb-12 pt-6 px-12">
        <ImgEl src="/covers/our-chores-cover.jpg" alt="Bla" actual />
        <div className="py-5 px-7">
          <h2 className="text-4xl font-semibold mb-2">Our Chores</h2>
          <p className="opacity-75 mb-8">Published in 2025</p>
          <p className="mb-16">Painting done on Watercolor Paper</p>
          <CTABtn primary={false}>
            <span className="flex items-center justify-center">
              <span>Discover</span>
              <svg
                className="ml-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.3331 8.66682L1.33301 7.33355H12.1143L9.48114 4.70037L10.4239 3.75757L14.6666 8.00022L10.4239 12.2429L9.48114 11.3L12.1143 8.66688L1.3331 8.66682Z"
                  fill="#505151"
                />
              </svg>
            </span>
          </CTABtn>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
