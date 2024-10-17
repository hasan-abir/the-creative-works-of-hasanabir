import EachPoemHero from "@/components/EachPoemHero";
import { fetchData } from "@/lib/sanity/client";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

interface StaticParamValue {
  slug: { current: string };
}

export interface Poem {
  title: string;
  body: any[];
  slug: { current: string };
  startedAt: string;
  finishedAt: string;
}

export const generateStaticParams = async () => {
  const poems = await fetchData<StaticParamValue[]>(`*[_type == "poem"]{ slug
  }`);

  return poems.map((poem) => ({
    slug: poem.slug.current,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  let title = "";

  const poem = await fetchData<{ title: string }[]>(
    `*[_type == "poem" && slug.current == "${params.slug}"]{
      title
    }`,
    params
  );

  if (poem.length > 0) {
    title = poem[0].title;
  }

  return {
    title,
  };
};

const Poem = async ({ params: { slug } }: { params: { slug: string } }) => {
  const poem = await fetchData<Poem[]>(
    `*[_type == "poem" && slug.current == "${slug}"]{
      title, body, slug, startedAt, finishedAt
    }`,
    { slug }
  );

  if (poem.length === 0) {
    notFound();
  }

  return (
    <div className="page-container">
      <EachPoemHero poem={poem[0]} />
    </div>
  );
};

export default Poem;
