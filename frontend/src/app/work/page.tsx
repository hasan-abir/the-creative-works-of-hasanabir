import {
  Book,
  getAllContentData,
  Painting,
  Song,
} from "@/lib/remark/getContent";
import Link from "next/link";

const Work = async () => {
  const songs = await getAllContentData<Song | Book | Painting>("music");
  const books = await getAllContentData<Song | Book | Painting>("books");
  const paintings = await getAllContentData<Song | Book | Painting>(
    "paintings",
  );

  const content = [...books, ...paintings, ...songs];

  return (
    <div className="page-container min-h-screen px-6">
      {content.map((item) => (
        <div key={item.id}>
          <Link href={`/work/${item.path}/`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Work;
