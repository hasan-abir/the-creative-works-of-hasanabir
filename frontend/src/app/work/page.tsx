import ItemSlider from "@/components/ItemSlider";
import {
  Book,
  getAllContentData,
  Painting,
  Song,
} from "@/lib/remark/getContent";
import "swiper/css";

const Work = async () => {
  const songs = await getAllContentData<Song | Book | Painting>("music");
  const books = await getAllContentData<Song | Book | Painting>("books");
  const paintings = await getAllContentData<Song | Book | Painting>(
    "paintings",
  );

  const content = [...books, ...paintings, ...songs];

  return (
    <div className="page-container min-h-screen px-6">
      <ItemSlider items={content} />
    </div>
  );
};

export default Work;
