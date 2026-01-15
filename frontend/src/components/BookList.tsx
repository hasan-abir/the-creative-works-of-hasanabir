import CardList from "@/components/CardList";
import Card from "@/components/Card";
import CTABtn from "@/components/CTABtn";
import ImgEl from "@/components/ImgEl";
import { getAllBooksData } from "@/lib/remark/getContent";

const BookList = async () => {
  const books = await getAllBooksData();

  return (
    <CardList>
      {books.map((book) => {
        return (
          <Card key={book.id}>
            <div className="flex">
              <ImgEl src={book.cover_image} alt={book.title} book_cover />
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-bold">{book.title}</h3>
                  <p className="text-sm opacity-75">
                    Published at {new Date(book.published_date).getFullYear()}
                  </p>
                </div>
                <p className="whitespace-pre-wrap line-clamp-3 max-w-[200px]">
                  {book.content_short}
                </p>
                <CTABtn block>Discover</CTABtn>
              </div>
            </div>
          </Card>
        );
      })}
    </CardList>
  );
};

export default BookList;
