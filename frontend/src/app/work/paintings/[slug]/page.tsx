import {
  Painting,
  getAllContentData,
  getContentData,
} from "@/lib/remark/getContent";
import ImgEl from "@/components/ImgEl";
import { notFound } from "next/navigation";

const EachPainting = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const painting = await getContentData<Painting>(`paintings/${slug}`);

  if (!painting) {
    notFound();
  }

  return (
    <div className="page-container min-h-screen px-6">
      <h1>Painting: {painting.title}</h1>
      <ImgEl
        src={painting.thumbnail}
        alt={painting.title}
        blurUrl={painting.blurUrl}
      />
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
