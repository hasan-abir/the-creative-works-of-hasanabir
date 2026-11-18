import {
  Book,
  getAllContentData,
  getContentData,
} from "@/lib/remark/getContent";
import ImgEl from "@/components/ImgEl";
import { notFound } from "next/navigation";

const EachBook = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const book = await getContentData<Book>(`books/${slug}`);

  if (!book) {
    notFound();
  }

  return (
    <div className="page-container min-h-screen px-6">
      <h1>Book: {book.title}</h1>
      <ImgEl src={book.cover_image} alt={book.title} blur_url={book.blurUrl} />
      <p>{book.content}</p>
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
