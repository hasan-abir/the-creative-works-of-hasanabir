import { Book, getAllContentData } from "@/lib/remark/getContent";
import Link from "next/link";

const AllBooks = async () => {
  const books = await getAllContentData<Book>("books");

  return (
    <div className="page-container min-h-screen px-6">
      {books.map((item) => (
        <div key={item.id}>
          <Link href={`/work/${item.path}/`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default AllBooks;
