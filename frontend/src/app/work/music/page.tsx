import ItemSlider from "@/components/ItemSlider";
import { getAllContentData, Song } from "@/lib/remark/getContent";

const Music = async () => {
  const music = await getAllContentData<Song>("music");

  return (
    <div className="page-container min-h-screen px-6">
      <ItemSlider items={music} />
    </div>
  );
};

export default Music;
