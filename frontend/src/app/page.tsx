import Card from "@/components/Card";
import BookList from "@/components/BookList";
import PaintingList from "@/components/PaintingList";
import SongList from "@/components/SongList";

const Home = () => {
  return (
    <div className="page-container">
      <section>
        <h2>Today's Highlight</h2>
        <p className="mb-8">
          Todo: the Card designs. Test them here in isolation.
        </p>
      </section>
      <BookList />
      <PaintingList />
      <SongList />
    </div>
  );
};

export default Home;
