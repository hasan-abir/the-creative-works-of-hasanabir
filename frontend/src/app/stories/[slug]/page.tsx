import ContinueReading from "@/components/ContinueReading";
import { fetchData } from "@/lib/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";

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

const Story = async ({ params: { slug } }: { params: { slug: string } }) => {
  const story = await fetchData<Story[]>(
    `*[_type == "story" && slug.current == "${slug}"]{
      title, excerpt, slug
    }`,
    { slug }
  );

  if (story.length === 0) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="max-w-5xl w-full">
        <h1 className="font-bold text-xl mb-4">{story[0].title}</h1>
        <p className="mb-4">{story[0].excerpt} ...</p>
        <ContinueReading basePath="/stories" classList="underline" />
        <br />
        <br />
        <Link
          href={`/${story[0].slug.current}.pdf`}
          className="underline"
          target="_blank"
        >
          Read the original PDF
        </Link>
        <br />
        <br />
        <Link href="/stories" className="underline">
          Back to stories
        </Link>
      </div>
    </main>
  );
};

export default Story;
