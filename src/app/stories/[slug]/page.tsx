import { getStoryData } from "@/lib/stories";

interface Props {
  params: { slug: string };
}

const Story = async ({ params }: Props) => {
  const storyData = await getStoryData(params.slug);

  return (
    <div dangerouslySetInnerHTML={{ __html: storyData.contentHtml }}></div>
  );
};
export default Story;
