import ArtSlider from "@/components/ArtSlider";
import HomeHero from "@/components/HomeHero";
import {
  Book,
  getAllContentData,
  getContentData,
  getTheLatestContent,
  Painting,
  Song,
} from "@/lib/remark/getContent";
import { notFound } from "next/navigation";

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // let contentFolder = searchParams["highlight"];
  let paintings = await getAllContentData<Painting>("paintings");
  paintings.sort((a, b) => {
    const aDate = new Date(b.date_created).getTime();
    const bDate = new Date(a.date_created).getTime();

    return aDate - bDate;
  });
  let books = await getAllContentData<Book>("books");
  books.sort((a, b) => {
    const aDate = new Date(b.published_date).getTime();
    const bDate = new Date(a.published_date).getTime();

    return aDate - bDate;
  });

  let songs = await getAllContentData<Song>("music");
  songs.sort((a, b) => {
    const aDate = new Date(b.date_created).getTime();
    const bDate = new Date(a.date_created).getTime();

    return aDate - bDate;
  });

  // if (!contentFolder) {
  //   contentFolder = getTheLatestContent();
  // }

  // const content = await getContentData<Book | Painting | Song>(contentFolder);

  // if (!content) {
  //   notFound();
  // }

  return (
    <div className="page-container min-h-screen">
      <HomeHero />
      <ArtSlider content={[...paintings, ...songs, ...books]} />
    </div>
  );
};

export default Home;
