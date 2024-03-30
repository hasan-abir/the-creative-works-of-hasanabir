import Link from "next/link";
import { NavArrowLeft } from "iconoir-react";

interface Props {
  title: string;
  page: number;
  pageCount: number;
}

const StoryPageHeader = ({ title, page, pageCount }: Props) => {
  return (
    <section>
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-xl sm:text-3xl max-w-[180px] sm:max-w-full">
          {title}
        </h1>
        <p>
          {page} of {pageCount}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <Link href="/stories" className="text-xs sm:text-sm flex items-center">
          <NavArrowLeft />
          <span>All Stories</span>
        </Link>
        <p className="text-xs sm:text-sm">
          by
          <Link
            href="https://hasanabir.netlify.app/"
            className="ml-1 hover:underline"
          >
            Hasan Abir
          </Link>
        </p>
      </div>
    </section>
  );
};

export default StoryPageHeader;
