import { getAllContentData, Song } from "@/lib/remark/getContent";
import Link from "next/link";

const Music = async () => {
  const music = await getAllContentData<Song>("music");

  return (
    <div className="page-container min-h-screen px-6">
      {music.map((item) => (
        <div key={item.id}>
          <Link href={`/work/${item.path}/`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Music;
