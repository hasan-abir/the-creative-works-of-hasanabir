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
    <section>
      <p className="text-center sm:text-xl mb-4 sm:mb-6">
        <strong>{title}</strong> written by{" "}
        <Link
          href="https://hasanabir.netlify.app/"
          className="underline text-nowrap"
        >
          Hasan Abir
        </Link>
      </p>
      <div className="flex justify-between items-center">
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

        <p className="sm:text-xl ml-4 whitespace-nowrap">
          {page} of {pageCount}
        </p>
      </div>
    </section>
  );
};

export default StoryPageHeader;
