import { getAllContentData, Painting } from "@/lib/remark/getContent";
import Link from "next/link";

const AllPaintings = async () => {
  const paintings = await getAllContentData<Painting>("paintings");

  return (
    <div className="page-container min-h-screen px-6">
      {paintings.map((item) => (
        <div key={item.id}>
          <Link href={`/work/${item.path}/`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default AllPaintings;
