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
    <main className="h-screen pt-6 sm:pt-16 px-6 sm:px-8 flex justify-center">
      <StoriesHero stories={stories} />
    </main>
  );
};

export default Stories;
