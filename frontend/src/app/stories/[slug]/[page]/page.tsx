import AnimatedRichText from "@/components/AnimatedRichText";
import { client } from "@/lib/sanity/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
    page: string;
  };
}

interface StaticParamValue {
  story: { slug: { current: string } };
  pageNumber: number;
}

interface Data {
  body: any[];
}

export const generateStaticParams = async () => {
  const pages = await client.fetch<StaticParamValue[]>(`*[_type == "storyPage"]{
    pageNumber, story->{slug}
  }`);

  return pages.map((pageContent) => ({
    slug: pageContent.story.slug.current,
    page: pageContent.pageNumber.toString(),
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  let title = "";

  const pageContent = await client.fetch<
    { pageNumber: number; story: { title: string } }[]
  >(
    `*[_type == "storyPage" && story->slug.current == "${params.slug}" && pageNumber == ${params.page}]{
      pageNumber, story->{title}
    }`
  );

  if (pageContent.length > 0) {
    title = `Page ${pageContent[0].pageNumber} of ${pageContent[0].story.title}`;
  }

  return {
    title,
  };
};

const StoryPage = async ({
  params: { slug, page },
}: {
  params: { slug: string; page: string };
}) => {
  const pageContent = await client.fetch<Data[]>(
    `*[_type == "storyPage" && story->slug.current == "${slug}" && pageNumber == ${page}]{
      body
    }`
  );

  const pageCount = await client.fetch<number>(
    `count(*[_type == "storyPage" && story->slug.current == "${slug}"])`
  );

  if (pageContent.length === 0) {
    notFound();
  }

  return (
    <main className="flex h-full min-h-screen h-full flex-col items-center justify-between p-8">
      <div className="max-w-5xl w-full flex-1 flex flex-col">
        <AnimatedRichText body={pageContent[0].body} />
        <h2 className="font-bold text-lg mt-4">
          Page {page} of {pageCount}
        </h2>
      </div>
    </main>
  );
};

export default StoryPage;
