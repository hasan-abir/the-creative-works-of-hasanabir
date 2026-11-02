import content from "@/app/work/content";

const Book = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div className="page-container min-h-screen px-6">
      <h1>Book: {slug}</h1>
    </div>
  );
};

export default Book;

export function generateStaticParams() {
  return content.map((item) => ({
    slug: item.slug,
  }));
}
