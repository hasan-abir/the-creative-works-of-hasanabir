import { client } from "@/lib/sanity/client";
import { PortableText } from "@portabletext/react";

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

  return (
    <div>
      <PortableText value={pageContent[0].body} />
    </div>
  );
};

export default StoryPage;
