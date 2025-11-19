import StoriesHero from "@/components/StoriesHero";
import { fetchData } from "@/lib/sanity/client";

export interface StoryInAList {
  _id: string;
  title: string;
  finishedAt: string;
  slug: { current: string };
  excerpt: string;
}

const Stories = async () => {
  const stories = await fetchData<StoryInAList[]>(`*[_type == "story"]{
    _id, title, excerpt, slug, finishedAt
  } | order(finishedAt desc)`);

  return (
    <div className="page-container">
      <StoriesHero stories={stories} />
    </div>
  );
};

export default Stories;
