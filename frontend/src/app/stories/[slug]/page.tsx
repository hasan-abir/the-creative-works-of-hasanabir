import ContinueReading from "@/components/ContinueReading";
import { fetchData } from "@/lib/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavArrowLeft } from "iconoir-react";

interface Props {
  params: { slug: string };
}

interface StaticParamValue {
  slug: { current: string };
}

export interface Story {
  title: string;
  excerpt: string;
  slug: { current: string };
  startedAt: string;
  finishedAt: string;
}

export const generateStaticParams = async () => {
  const stories = await fetchData<StaticParamValue[]>(`*[_type == "story"]{ slug
  }`);

  return stories.map((story) => ({
    slug: story.slug.current,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  let title = "";

  const story = await fetchData<{ title: string }[]>(
    `*[_type == "story" && slug.current == "${params.slug}"]{
      title
    }`,
    params
  );

  if (story.length > 0) {
    title = story[0].title;
  }

  return {
    title,
  };
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Story = async ({ params: { slug } }: { params: { slug: string } }) => {
  const story = await fetchData<Story[]>(
    `*[_type == "story" && slug.current == "${slug}"]{
      title, excerpt, slug, startedAt, finishedAt
    }`,
    { slug }
  );

  if (story.length === 0) {
    notFound();
  }

  return (
    <main className="h-screen pt-6 sm:pt-16 px-6 sm:px-8 flex justify-center">
      <div className="max-w-5xl w-full h-hull flex flex-col justify-between items-start">
        <section>
          <h1 className="font-bold text-3xl sm:text-6xl sm:mb-2">
            {story[0].title}
          </h1>
          <p className="mb-4 sm:mb-8 text-sm sm:text-base opacity-70">
            Written between{" "}
            <span>
              {monthNames[new Date(story[0].startedAt).getMonth()]}.{" "}
              {new Date(story[0].startedAt).getFullYear()}
            </span>{" "}
            and{" "}
            <span>
              {monthNames[new Date(story[0].finishedAt).getMonth()]}.{" "}
              {new Date(story[0].finishedAt).getFullYear()}
            </span>
          </p>
          <div className="flex">
            <Link href="/" className="inline-flex items-center sm:text-lg">
              <NavArrowLeft />
              <span>Home</span>
            </Link>
            <Link
              href="/stories"
              className="ml-2 inline-flex items-center sm:text-lg"
            >
              <NavArrowLeft />
              <span>Stories</span>
            </Link>
          </div>
        </section>
        <section className="flex-1 mt-8 sm:mt-12 pb-6 sm:pb-16">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="max-w-[400px]">
              <ContinueReading
                basePath="/stories"
                classList="font-bold inline-block py-2 px-6 bg-light-100 dark:bg-dark-100 border-b-2 border-dark-100 dark:border-light-100 text-lg rounded-md sm:text-2xl mb-4 sm:mb-6 hover:bg-light-100 hover:dark:bg-dark-100"
              />
              <p className="text-sm sm:text-base opacity-70">
                This allows you to read the story line by line, so that
                it&apos;s easier to take in and understand.
              </p>
            </div>
            <div className="h-px sm:w-px sm:h-auto my-8 sm:my-0 sm:mx-8 bg-dark-100 dark:bg-light-100"></div>
            <div className="max-w-[400px]">
              <Link
                href={`/${story[0].slug.current}.pdf`}
                target="_blank"
                className="font-bold inline-block py-2 px-6 bg-light-100 dark:bg-dark-210 border-b-2 border-dark-100 dark:border-light-100 text-lg rounded-md sm:text-2xl mb-4 sm:mb-6 hover:bg-light-100 hover:dark:bg-dark-100"
              >
                Read The PDF
              </Link>
              <p className="text-sm sm:text-base opacity-70">
                This allows to read the story in its original formatting, the
                way it would look on printed paper.
              </p>
            </div>
          </div>
          <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-6 before:h-6 before:sm:w-10 before:sm:h-10 before:border-2 before:border-yellow-950 before:dark:border-light-100 before:translate-x-[-50%]  before:translate-y-[-50%] relative border-2 border-yellow-950 dark:border-light-100 p-4 sm:p-8 mt-12 sm:mt-16">
            <h2 className="text-lg sm:text-3xl mb-6">An Excerpt</h2>
            <p className="text-lg sm:text-3xl opacity-70">
              &quot;{story[0].excerpt}&quot;
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Story;
