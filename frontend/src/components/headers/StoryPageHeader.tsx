import Link from "next/link";

interface Props {
  title: string;
  page: number;
  pageCount: number;
}

const StoryPageHeader = ({ title, page, pageCount }: Props) => {
  return (
    <section>
      <div className="flex justify-between mb-2 border-b-2 border-current">
        <h1 className="text-2xl">{title}</h1>
        <p>
          {page} of {pageCount}
        </p>
      </div>
      <p className="mb-4">
        <em>
          Written by{" "}
          <Link href="https://hasanabir.netlify.app/" className="underline">
            Hasan Abir
          </Link>
        </em>
      </p>
      <Link href="/stories" className="underline mb-4">
        Back to stories
      </Link>
    </section>
  );
};

export default StoryPageHeader;
