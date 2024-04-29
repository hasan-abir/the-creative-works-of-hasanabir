import ContinueReading from "@/components/ContinueReading";
import { fetchData } from "@/lib/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackNav from "@/components/BackNav";
import CTALink from "@/components/CTALink";
import { Marcellus_SC } from "next/font/google";

const marcellusSC = Marcellus_SC({
  weight: ["400"],
  subsets: ["latin"],
});

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
        <section className="flex flex-col items-start justify-start sm:flex-row">
          <BackNav
            links={[
              {
                url: "/",
                txt: "Home",
              },
              {
                url: "/stories",
                txt: "Stories",
              },
            ]}
          />
          <div className="mt-4 ml-0 sm:mt-0 sm:ml-16">
            <h1
              className={
                marcellusSC.className + " text-3xl sm:text-6xl sm:mb-2"
              }
            >
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
          </div>
        </section>
        <section className="flex-1 mt-8 sm:mt-12 pb-6 sm:pb-16">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="max-w-[400px]">
              <ContinueReading basePath="/stories" />
              <p className="text-sm sm:text-base opacity-70">
                This allows you to read the story line by line, so that
                it&apos;s easier to take in and understand.
              </p>
            </div>
            <div className="h-[0.025rem] sm:w-px sm:h-auto my-8 sm:my-0 sm:mx-8 bg-dark-300 dark:bg-light-100 opacity-20"></div>
            <div className="max-w-[400px]">
              <CTALink
                text="Read The PDF"
                href={`/${story[0].slug.current}.pdf`}
                target="_blank"
                extraClasses="mb-4 sm:mb-6"
              />
              <p className="text-sm sm:text-base opacity-70">
                This allows to read the story in its original formatting, the
                way it would look on printed paper.
              </p>
            </div>
          </div>
          <div className="h-[0.025rem] bg-dark-300 dark:bg-light-100  mt-12 sm:mt-16 opacity-20"></div>
          <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-6 before:h-6 before:sm:w-10 before:sm:h-10 before:border-[0.025rem] before:border-dark-300 before:dark:border-light-100 before:translate-x-[-50%]  before:translate-y-[-50%] before:opacity-20 relative p-4 sm:p-8">
            <h2 className={marcellusSC.className + " text-lg sm:text-3xl mb-6"}>
              An Excerpt
            </h2>
            <p className="text-base sm:text-2xl opacity-70">
              &quot;{story[0].excerpt}&quot;
            </p>
          </div>
          <div className="h-[0.025rem] bg-dark-300 dark:bg-light-100 opacity-20"></div>
        </section>
      </div>
    </main>
  );
};

export default Story;
