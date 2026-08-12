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

  // if (!contentFolder) {
  //   contentFolder = getTheLatestContent();
  // }

  // const content = await getContentData<Book | Painting | Song>(contentFolder);

  // if (!content) {
  //   notFound();
  // }

  return (
    <div className="page-container min-h-screen px-6">
      <HomeHero />
      <ArtSlider content={[...paintings]} />
    </div>
  );
};

export default Home;
