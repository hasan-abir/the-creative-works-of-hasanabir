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
import { headingFont } from "@/utils/fonts";

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
      <section className="page-container w-full text-right absolute top-0 left-[50%] translate-x-[-50%]">
        <h1 className="mb-4">
          <span className="text-base">Art & Literature of</span>
          <span className="uppercase block font-black">hasan abir</span>
        </h1>
        <p className="mb-8">Home for all my work as an Artist</p>
        <div className="flex justify-end">
          {contentFolder ? (
            <CTABtn
              extraClasses="min-w-[200px]"
              href="/#highlights"
              newTab={false}
            >
              <span className="flex items-center justify-between px-6">
                <span>Today's Highlights</span>
              </span>
            </CTABtn>
          ) : null}
          <CTABtn
            primary={false}
            extraClasses="min-w-[200px] ml-4"
            href="mailto:contact.hasanabir@gmail.com"
          >
            <span className="flex items-center justify-between px-6">
              <span>Contact</span>
              <span className="h-px w-full opacity-10 bg-dark-200 ml-2 mr-px flex-1"></span>
              <icons.SendIcon />
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
