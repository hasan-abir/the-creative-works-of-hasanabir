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
              <ImgEl src={book.cover_image} alt={book.title} />
              <div>
                <h3>{book.title}</h3>
                <p>Published at {book.publishedAt}</p>
                <p className="whitespace-pre-wrap line-clamp-3 max-w-[360px]">
                  {book.content}
                </p>
                <CTABtn>Discover</CTABtn>
              </div>
            </div>
          </Card>
        );
      })}
    </CardList>
  );
};

export default BookList;
