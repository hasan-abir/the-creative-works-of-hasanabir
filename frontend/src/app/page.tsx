import TodaysHighlight from "@/components/TodaysHighlight";
import CardList from "@/components/CardList";
import Card from "@/components/Card";
import { paintings, songs, Content } from "@/utils/content";
import { fetchData } from "@/lib/sanity/client";

export interface StoryInAList {
  _id: string;
  title: string;
  finishedAt: string;
  slug: { current: string };
  excerpt: string;
}

export interface PoemsInAList {
  _id: string;
  title: string;
  finishedAt: string;
  slug: { current: string };
}

const Home = async () => {
  const fetchedStories = await fetchData<StoryInAList[]>(`*[_type == "story"]{
    _id, title, excerpt, slug, finishedAt
  } | order(finishedAt desc)`);

  const fetchedPoems = await fetchData<PoemsInAList[]>(`*[_type == "poem"]{
      _id, title, slug, finishedAt
    } | order(finishedAt desc)`);

  const stories: Content[] = fetchedStories.map<Content>((story) => ({
    title: story.title,
    published_year: new Date(story.finishedAt).getFullYear().toString(),
    thumbnailSrc: "/herobg.webp",
  }));

  const poems: Content[] = fetchedPoems.map<Content>((poem) => ({
    title: poem.title,
    published_year: new Date(poem.finishedAt).getFullYear().toString(),
    thumbnailSrc: "/herobg.webp",
  }));

  const contentPool: Content[] = [...stories, ...poems, ...paintings];
  const randomContentIndex = Math.floor(Math.random() * contentPool.length - 1);

  return (
    <div className="page-container">
      <section>
        <h1>Today's Highlight</h1>
        <TodaysHighlight content={contentPool[randomContentIndex]} />
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
        </CardList>
      </section>
    </div>
  );
};

export default Home;
