import AnimatedRichText from "@/components/AnimatedRichText";
import { client } from "@/lib/sanity/client";
import Link from "next/link";
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
  story: {
    title: string;
    slug: { current: string };
  };
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
      body, story->{title,slug}
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
        <div className="flex justify-between mb-2 border-b-2 border-current">
          <h1 className="text-2xl">{pageContent[0].story.title}</h1>
          <p>
            {page} of {pageCount}
          </p>
        </div>
        <p className="mb-4">
          <em>
            Written by{" "}
            <Link href="https://hasanabir.netlify.app/" className="underline">
              Hasan Abir
            </Link>
          </em>
        </p>
        <Link href="/stories" className="underline mb-4">
          Back to stories
        </Link>

        <AnimatedRichText
          body={pageContent[0].body}
          prevUrl={`/stories/${pageContent[0].story.slug.current}/${
            parseInt(page) - 1
          }`}
          currentUrl={`/stories/${pageContent[0].story.slug.current}/${parseInt(
            page
          )}`}
          nextUrl={`/stories/${pageContent[0].story.slug.current}/${
            parseInt(page) + 1
          }`}
          firstPage={parseInt(page) === 1}
          lastPage={parseInt(page) === pageCount}
        />
      </div>
    </main>
  );
};

export default StoryPage;
