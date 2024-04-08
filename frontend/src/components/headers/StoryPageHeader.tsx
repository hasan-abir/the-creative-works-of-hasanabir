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
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-[2rem] sm:text-4xl pr-2">{title}</h1>
        <p className="text-xl sm:text-2xl whitespace-nowrap">
          {page} of {pageCount}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <Link href="/stories" className="flex items-center sm:text-lg">
          <NavArrowLeft />
          <span>All Stories</span>
        </Link>
        <p className="sm:text-lg">
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
