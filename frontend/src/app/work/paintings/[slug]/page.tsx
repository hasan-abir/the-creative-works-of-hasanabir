import { getAllContentData, Painting } from "@/lib/remark/getContent";

const EachPainting = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div className="page-container min-h-screen px-6">
      <h1>Painting: {slug}</h1>
    </div>
  );
};

export default EachPainting;

export async function generateStaticParams() {
  const content = await getAllContentData<Painting>("paintings");

  return content.map((item) => ({
    slug: item.id,
  }));
}
