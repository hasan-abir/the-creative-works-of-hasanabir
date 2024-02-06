import { client } from "@/lib/sanity/client";
import Link from "next/link";

interface StaticParamValue {
  slug: { current: string };
}

interface Data {
  title: string;
  excerpt: string;
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
      title, excerpt
    }`
  );

  return (
    <div>
      <h1>{story[0].title}</h1>
      <p>{story[0].excerpt}</p>
      <Link href="/stories">Back to stories</Link>
    </div>
  );
};

export default Story;
