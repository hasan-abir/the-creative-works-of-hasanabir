import { client } from "@/lib/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";

interface StaticParamValue {
  slug: { current: string };
}

interface Data {
  title: string;
  excerpt: string;
  slug: { current: string };
}

export const generateStaticParams = async () => {
  const stories = await client.fetch<
    StaticParamValue[]
  >(`*[_type == "story"]{ slug
  }`);

  return stories.map((story) => ({
    slug: story.slug.current,
  }));
};

const Story = async ({ params: { slug } }: { params: { slug: string } }) => {
  const story = await client.fetch<Data[]>(
    `*[_type == "story" && slug.current == "${slug}"]{
      title, excerpt, slug
    }`
  );

  if (story.length === 0) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full">
        <h1 className="font-bold text-xl mb-4">{story[0].title}</h1>
        <p className="mb-4">{story[0].excerpt} ...</p>
        <Link
          href={`/stories/${story[0].slug.current}/1`}
          className="underline"
        >
          Start reading
        </Link>
        <br />
        <Link href="/stories" className="underline">
          Back to stories
        </Link>
      </div>
    </main>
  );
};

export default Story;
