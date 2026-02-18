import Highlights from "@/components/Highlights";
import BookList from "@/components/BookList";
import PaintingList from "@/components/PaintingList";
import SongList from "@/components/SongList";
import { getContentData, Book, Painting, Song } from "@/lib/remark/getContent";

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const contentFolder = searchParams["highlights"];

  const content = await getContentData<Book | Painting | Song>(
    contentFolder || "books/our-chores",
  );

  return (
    <div className="page-container">
      {content ? <Highlights content={content} /> : <p>Project not found</p>}
      <BookList />
      <PaintingList />
      <SongList />
    </div>
  );
};

export default Home;
