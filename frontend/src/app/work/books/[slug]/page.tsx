import { Book, getAllContentData } from "@/lib/remark/getContent";

const EachBook = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div className="page-container min-h-screen px-6">
      <h1>Book: {slug}</h1>
    </div>
  );
};

export default EachBook;

export async function generateStaticParams() {
  const content = await getAllContentData<Book>("books");

  return content.map((item) => ({
    slug: item.id,
  }));
}
