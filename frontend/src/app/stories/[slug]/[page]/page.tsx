import LinesList from "@/components/LinesList";
import StoryPageHeader from "@/components/headers/StoryPageHeader";
import { fetchData } from "@/lib/sanity/client";
import { notFound } from "next/navigation";
import { Rubik_Mono_One } from "next/font/google";

const rubyMonoOne = Rubik_Mono_One({
  weight: ["400"],
  subsets: ["latin"],
});

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
  const pages = await fetchData<StaticParamValue[]>(`*[_type == "storyPage"]{
    pageNumber, story->{slug}
  }`);

  return pages.map((pageContent) => ({
    slug: pageContent.story.slug.current,
    page: pageContent.pageNumber.toString(),
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  let title = "";

  const pageContent = await fetchData<
    { pageNumber: number; story: { title: string } }[]
  >(
    `*[_type == "storyPage" && story->slug.current == "${params.slug}" && pageNumber == ${params.page}]{
      pageNumber, story->{title}
    }`,
    params
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
  const pageContent = await fetchData<Data[]>(
    `*[_type == "storyPage" && story->slug.current == "${slug}" && pageNumber == ${page}]{
      body, story->{title,slug}
    }`,
    { slug, page }
  );

  const pageCount = await fetchData<number>(
    `count(*[_type == "storyPage" && story->slug.current == "${slug}"])`,
    { slug }
  );

  if (pageContent.length === 0) {
    notFound();
  }

  return (
    <main className="h-screen pt-6 sm:pt-16 px-6 sm:px-8 flex justify-center overflow-x-hidden">
      <div className="hidden sm:flex absolute top-0 left-0 z-[-1000] w-full h-screen items-center justify-center opacity-5">
        <h1
          className={
            rubyMonoOne.className + " text-center leading-none text-[20vw]"
          }
        >
          {pageContent[0].story.title}
        </h1>
      </div>
      <div className="max-w-5xl w-full h-full flex flex-col justify-between">
        <StoryPageHeader
          title={
            pageContent[0] && pageContent[0].story && pageContent[0].story.title
          }
          slug={slug}
          page={parseInt(page)}
          pageCount={pageCount}
        />
        <LinesList
          body={pageContent[0].body}
          basePath="/stories"
          firstPage={parseInt(page) === 1}
          lastPage={parseInt(page) === pageCount}
        />
      </div>
    </main>
  );
};

export default StoryPage;
