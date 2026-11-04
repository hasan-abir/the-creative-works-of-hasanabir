import { Song, getAllContentData } from "@/lib/remark/getContent";

const EachSong = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div className="page-container min-h-screen px-6">
      <h1>Song: {slug}</h1>
    </div>
  );
};

export default EachSong;

export async function generateStaticParams() {
  const content = await getAllContentData<Song>("music");

  return content.map((item) => ({
    slug: item.id,
  }));
}
