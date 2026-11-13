import ItemSlider from "@/components/ItemSlider";
import { getAllContentData, Painting } from "@/lib/remark/getContent";

const AllPaintings = async () => {
  let paintings = await getAllContentData<Painting>("paintings");

  return (
    <div className="page-container min-h-screen px-6">
      <ItemSlider items={paintings} />
    </div>
  );
};

export default AllPaintings;
