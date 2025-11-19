import EachStoryHero from "@/components/EachStoryHero";
import { fetchData } from "@/lib/sanity/client";
import { isPublished } from "@/utils/envVariables";
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
    <div className="page-container">
      <EachStoryHero story={story[0]} isPublished={isPublished} />
    </div>
  );
};

export default Story;
