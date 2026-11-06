import { Book, getAllContentData } from "@/lib/remark/getContent";
import ItemSlider from "@/components/ItemSlider";

const AllBooks = async () => {
  const books = await getAllContentData<Book>("books");

  return (
    <div className="page-container min-h-screen px-6">
      <ItemSlider items={books} />
    </div>
  );
};

export default AllBooks;
