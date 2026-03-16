import Highlights from "@/components/Highlights";
import BookList from "@/components/BookList";
import PaintingList from "@/components/PaintingList";
import SongList from "@/components/SongList";
import CTABtn from "@/components/CTABtn";
import {
  getTheLatestContent,
  getContentData,
  Book,
  Painting,
  Song,
} from "@/lib/remark/getContent";
import { icons } from "@/utils/icons/";
import { notFound } from "next/navigation";
const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const contentFolder = searchParams["highlight"];

  const content = await getContentData<Book | Painting | Song>(
    contentFolder || getTheLatestContent(),
  );

  if (!content) {
    notFound();
  }

  return (
    <div className="page-container">
      <section className="mb-16">
        <h1 className="mb-4">
          <span className="text-base">Art & Literature of</span>
          <span className="uppercase block font-black">hasan abir</span>
        </h1>
        <p className="mb-8">Home for all my work as an Artist</p>
        <div className="flex">
          <CTABtn
            primary={false}
            extraClasses="min-w-[200px] mr-4"
            href="mailto:contact.hasanabir@gmail.com"
          >
            <span className="flex items-center justify-between px-6">
              <span>Contact</span>
              <icons.SendIcon />
            </span>
          </CTABtn>
          <CTABtn
            extraClasses="min-w-[200px]"
            href="/#highlights"
            newTab={false}
          >
            <span className="flex items-center justify-between px-6">
              <span>Today's Highlights</span>
            </span>
          </CTABtn>
        </div>
      </section>

      <Highlights
        content={content}
        customHeading={contentFolder ? "Project Detail" : undefined}
      />
      <BookList />
      <PaintingList />
      <SongList />
    </div>
  );
};

export default Home;
