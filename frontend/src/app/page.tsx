import Highlights from "@/components/Highlights";
import BookList from "@/components/BookList";
import PaintingList from "@/components/PaintingList";
import SongList from "@/components/SongList";
import CTABtn from "@/components/CTABtn";
import {
  getTheLatestContent,
  getContentData,
  Book,
  Painting,
  Song,
} from "@/lib/remark/getContent";
import { icons } from "@/utils/icons/";
import { notFound } from "next/navigation";
const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const contentFolder = searchParams["highlight"];

  const content = await getContentData<Book | Painting | Song>(
    contentFolder || getTheLatestContent(),
  );

  if (!content) {
    notFound();
  }

  return (
    <div className="page-container">
      <section className="mb-16">
        <h1 className="mb-4">
          <span className="text-base">Art & Literature of</span>
          <span className="uppercase block font-black">hasan abir</span>
        </h1>
        <p className="mb-2">Home for all my work as an Artist</p>
        <CTABtn primary={false} extraClasses="min-w-[200px]">
          <span className="flex items-center justify-between px-6">
            <span>Contact</span>
            <span className="h-px flex-1 bg-gray-300 ml-4 mr-2"></span>
            <icons.SendIcon />
          </span>
        </CTABtn>
      </section>

      <Highlights
        content={content}
        customHeading={contentFolder ? "Project Detail" : undefined}
      />
      <BookList />
      <PaintingList />
      <SongList />
    </div>
  );
};

export default Home;
