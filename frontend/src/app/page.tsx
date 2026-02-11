import Highlights from "@/components/Highlights";
import BookList from "@/components/BookList";
import PaintingList from "@/components/PaintingList";
import SongList from "@/components/SongList";

const Home = () => {
  return (
    <div className="page-container">
      <Highlights />
      <BookList />
      <PaintingList />
      <SongList />
    </div>
  );
};

export default Home;
