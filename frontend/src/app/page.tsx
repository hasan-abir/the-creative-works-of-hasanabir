import Highlights from "@/components/Highlights";
import BookList from "@/components/BookList";
import PaintingList from "@/components/PaintingList";
import SongList from "@/components/SongList";
import HomeHero from "@/components/HomeHero";
import {
  getTheLatestContent,
  getContentData,
  Book,
  Painting,
  Song,
} from "@/lib/remark/getContent";
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
    <div className="page-container min-h-screen px-6">
      <HomeHero highlights={contentFolder ? true : false} />

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
