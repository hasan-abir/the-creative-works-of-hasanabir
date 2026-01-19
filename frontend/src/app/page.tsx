import Card from "@/components/Card";
import BookList from "@/components/BookList";
import PaintingList from "@/components/PaintingList";

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

      {/* <TodaysHighlight content={contentPool[randomContentIndex]} />
        <h1>Short Stories</h1>
        <CardList>
          {stories.map((story) => {
            return (
              <Card
                key={story.thumbnailSrc}
                extraClasses="mr-4"
                title={story.title}
                thumbnailSrc={story.thumbnailSrc}
                published_year={story.published_year}
              />
            );
          })}
        </CardList>
        <h1>Paintings</h1>
        <CardList>
          {paintings.map((painting) => {
            return (
              <Card
                key={painting.thumbnailSrc}
                extraClasses="mr-4"
                title={painting.title}
                thumbnailSrc={painting.thumbnailSrc}
                published_year={painting.published_year}
              />
            );
          })}
        </CardList>
        <h1>Poems</h1>
        <CardList>
          {poems.map((poem) => {
            return (
              <Card
                key={poem.thumbnailSrc}
                extraClasses="mr-4"
                title={poem.title}
                thumbnailSrc={poem.thumbnailSrc}
                published_year={poem.published_year}
              />
            );
          })}
        </CardList>
        <h1>Songs</h1>
        <CardList>
          {songs.map((song) => {
            return (
              <Card
                key={song.thumbnailSrc}
                audio={true}
                extraClasses="mr-4"
                title={song.title}
                thumbnailSrc={song.thumbnailSrc}
                published_year={song.published_year}
              />
            );
          })}
        </CardList> */}
    </div>
  );
};

export default Home;
