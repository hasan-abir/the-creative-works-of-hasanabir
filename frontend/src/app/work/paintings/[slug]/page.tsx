import content from "@/app/work/content";

const Painting = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div className="page-container min-h-screen px-6">
      <h1>Painting: {slug}</h1>
    </div>
  );
};

export default Painting;

export function generateStaticParams() {
  return content.map((item) => ({
    slug: item.slug,
  }));
}
