"use client";

import Link from "next/link";
import { NavArrowLeft } from "iconoir-react";
import BackNav from "@/components/BackNav";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  slug: string;
  page: number;
  pageCount: number;
}

const StoryPageHeader = ({ title, slug, page, pageCount }: Props) => {
  const router = useRouter();

  const jumpToPage = useCallback((pageNo: number) => {
    router.push(`/stories/${slug}/${pageNo}`);
  }, []);

  return (
    <header className="flex gap-2 justify-between items-center mb-4 sm:mb-6">
      <BackNav
        links={[
          {
            url: "/",
            txt: "Home",
          },
          {
            url: "/stories",
            txt: "Stories",
          },
          {
            url: "/stories/" + slug,
            txt: title,
          },
        ]}
      />
      <p className="text-center sm:text-xl ">
        <Link href={"/stories/" + slug}>
          <strong>{title}</strong>
        </Link>{" "}
        written by{" "}
        <Link
          href="https://hasanabir.netlify.app/"
          target="_blank"
          className="underline text-nowrap"
        >
          Hasan Abir
        </Link>
      </p>

      <p className="sm:text-xl whitespace-nowrap">
        <select
          className="bg-light-50 dark:bg-dark-50 text-dark-50 dark:text-light-50 focus:ring-none focus:outline-none"
          defaultValue={page}
          onChange={(e) =>
            jumpToPage(parseInt((e.target as HTMLSelectElement).value))
          }
        >
          {Array.from({ length: pageCount }).map((val, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        of {pageCount}
      </p>
    </header>
  );
};

export default StoryPageHeader;
