import { fetchData } from "@/lib/sanity/client";
import Link from "next/link";
import { NavArrowLeft } from "iconoir-react";
import BackNav from "@/components/BackNav";

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
  }`);

  return (
    <main className="h-screen pt-6 sm:pt-16 px-6 sm:px-8 flex justify-center">
      <div className="max-w-5xl w-full h-hull flex flex-col items-start">
        <section className="mb-2 sm:mb-8">
          <h1 className="font-bold text-3xl sm:text-6xl mb-4 sm:mb-8">
            A Collection Of Short Stories
          </h1>
          <div className="flex justify-start">
            <BackNav links={[{ url: "/", txt: "Home" }]} />
          </div>
        </section>
        <section className="pb-6 sm:pb-16 flex flex-col sm:flex-row flex-wrap">
          {stories.map((story) => {
            return (
              <Link
                key={story._id}
                href={`/stories/${story.slug.current}`}
                className="bg-light-100 dark:bg-dark-100 after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 relative after:translate-x-2 after:translate-y-2 after:rounded-lg after:bg-dark-50 after:dark:bg-dark-200 rounded-lg px-4 py-6 sm:px-8 sm:py-10 mt-6 sm:mt-8 mr-6 sm:mr-8 max-w-[450px] after:z-[-1000]"
              >
                <div className="flex justify-between">
                  <h1 className="font-bold text-lg sm:text-3xl mb-6 pr-2 sm:pr-4">
                    {story.title}
                  </h1>
                  <p className="text-base sm:text-lg">
                    {new Date(story.finishedAt).getFullYear()}
                  </p>
                </div>
                <p className="line-clamp-4 opacity-70 text-base sm:text-lg">
                  {story.excerpt}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Stories;
