import Link from "next/link";
import { NavArrowLeft } from "iconoir-react";
import BackNav from "@/components/BackNav";

interface Props {
  title: string;
  slug: string;
  page: number;
  pageCount: number;
}

const StoryPageHeader = ({ title, slug, page, pageCount }: Props) => {
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
        <strong>{title}</strong> written by{" "}
        <Link
          href="https://hasanabir.netlify.app/"
          target="_blank"
          className="underline text-nowrap"
        >
          Hasan Abir
        </Link>
      </p>

      <p className="sm:text-xl whitespace-nowrap">
        {page} of {pageCount}
      </p>
    </header>
  );
};

export default StoryPageHeader;
