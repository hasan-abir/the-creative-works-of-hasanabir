import { getStoryData } from "@/lib/stories";

interface Props {
  params: { slug: string; page: number };
}

const StoryPage = async ({ params }: Props) => {
  const pageData = await getStoryData(params.slug, params.page);

  return <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }}></div>;
};

export default StoryPage;
