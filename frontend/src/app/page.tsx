import TodaysHighlight from "@/components/TodaysHighlight";
import CardList from "@/components/CardList";
import Card from "@/components/Card";
import { paintings, songs } from "@/utils/content";

export default function Home() {
  return (
    <div className="page-container">
      <section>
        <h1>Today's Highlight</h1>
        <TodaysHighlight />
        <h1>Short Stories</h1>
        <h1>Paintings</h1>
        <CardList>
          {paintings.map((painting) => {
            return (
              <Card
                extraClasses="mr-4"
                title={painting.title}
                thumbnailSrc={painting.thumbnailSrc}
                published_year={painting.published_year}
              />
            );
          })}
        </CardList>
        <h1>Poems</h1>
        <h1>Songs</h1>
        <CardList>
          {songs.map((song) => {
            return (
              <Card
                audio={true}
                extraClasses="mr-4"
                title={song.title}
                thumbnailSrc={song.thumbnailSrc}
                published_year={song.published_year}
              />
            );
          })}
        </CardList>
      </section>
    </div>
  );
}
