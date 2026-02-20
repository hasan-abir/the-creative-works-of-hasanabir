import CardList from "@/components/CardList";
import Card from "@/components/Card";
import CTABtn from "@/components/CTABtn";
import ImgEl from "@/components/ImgEl";
import { getAllContentData, Book } from "@/lib/remark/getContent";
import Link from "next/link";

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
                href={`?highlight=${book.path}`}
              />
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <Link href={`?highlight=${book.path}`}>
                    <h3>{book.title}</h3>
                  </Link>
                  <p className="opacity-75">
                    Published at {new Date(book.published_date).getFullYear()}
                  </p>
                </div>
                <p className="whitespace-pre-wrap line-clamp-3 w-[190px]">
                  {book.content_short}
                </p>
                <CTABtn block>
                  <span className="flex items-center justify-center">
                    <span>Discover</span>
                    <svg
                      className="ml-2"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.3331 8.66682L1.33301 7.33355H12.1143L9.48114 4.70037L10.4239 3.75757L14.6666 8.00022L10.4239 12.2429L9.48114 11.3L12.1143 8.66688L1.3331 8.66682Z"
                        fill="#505151"
                      />
                    </svg>
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
