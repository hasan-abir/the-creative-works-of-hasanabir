import { fetchData } from "@/lib/sanity/client";
import Link from "next/link";
import BackNav from "@/components/BackNav";
import { Marcellus_SC } from "next/font/google";
const marcellusSC = Marcellus_SC({
  weight: ["400"],
  subsets: ["latin"],
});

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
        <section className="flex flex-col items-start justify-start sm:flex-row mb-2 sm:mb-8">
          <BackNav
            links={[
              {
                url: "/",
                txt: "Home",
              },
            ]}
          />
          <h1
            className={
              marcellusSC.className +
              " mt-4 ml-0 sm:mt-0 sm:ml-16 text-3xl sm:text-6xl mb-4 sm:mb-8"
            }
          >
            A Collection Of Short Stories
          </h1>
        </section>
        <section className="pb-6 sm:pb-16 flex flex-col sm:flex-row flex-wrap">
          {stories.map((story) => {
            return (
              <Link
                key={story._id}
                href={`/stories/${story.slug.current}`}
                className="mt-6 mr-0 sm:mr-8 max-w-[450px] inline-block py-8 px-6 sm:py-10 sm:px-8 bg-light-50 dark:bg-dark-200 border-2 border-b-0 border-dark-300 dark:border-dark-50 text-lg sm:text-2xl relative after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-1 after:bg-primary-50 after:ring-2 after:ring-dark-300 after:dark:ring-dark-50 hover:translate-y-[-0.3rem] transition-transform"
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
