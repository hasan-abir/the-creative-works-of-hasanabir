import { fetchData } from "@/lib/sanity/client";
import Link from "next/link";

export interface StoryInAList {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
}

const Stories = async () => {
  const stories = await fetchData<StoryInAList[]>(`*[_type == "story"]{
    _id, title, excerpt, slug
  }`);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="max-w-5xl w-full">
        {stories.map((story) => {
          return (
            <div key={story._id} className="mb-8">
              <h1 className="font-bold text-xl mb-4">{story.title}</h1>
              <p className="mb-4">{story.excerpt} ...</p>
              <Link
                href={`/stories/${story.slug.current}`}
                className="underline"
              >
                View
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Stories;
