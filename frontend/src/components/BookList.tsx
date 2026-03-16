import CardList from "@/components/CardList";
import Card from "@/components/Card";
import CTABtn from "@/components/CTABtn";
import ImgEl from "@/components/ImgEl";
import { getAllContentData, Book } from "@/lib/remark/getContent";
import Link from "next/link";
import { icons } from "@/utils/icons";

const BookList = async () => {
  const books = await getAllContentData<Book>("books");

  return (
    <CardList heading="Books">
      {books.map((book) => {
        return (
          <Card key={book.id}>
            <div className="flex">
              <ImgEl
                src={book.cover_image}
                alt={book.title}
                book_cover
                href={`?highlight=${book.path}#highlights`}
              />
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <Link href={`?highlight=${book.path}#highlights`}>
                    <h3>{book.title}</h3>
                  </Link>
                  <p className="opacity-75">
                    Published at {new Date(book.published_date).getFullYear()}
                  </p>
                </div>
                <p className="whitespace-pre-wrap line-clamp-3 w-[190px]">
                  {book.content_short}
                </p>
                <CTABtn block href={book.amazon_link}>
                  <span className="flex items-center justify-center">
                    <span>Discover</span>
                    <icons.RightIcon />
                  </span>
                </CTABtn>
              </div>
            </div>
          </Card>
        );
      })}
    </CardList>
  );
};

export default BookList;
