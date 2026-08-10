import ArtSlider from "@/components/ArtSlider";
import HomeHero from "@/components/HomeHero";
import {
  Book,
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
  let contentFolder = searchParams["highlight"];

  if (!contentFolder) {
    contentFolder = getTheLatestContent();
  }

  const content = await getContentData<Book | Painting | Song>(contentFolder);

  if (!content) {
    notFound();
  }

  return (
    <div className="page-container min-h-screen px-6">
      <HomeHero />
      <pre>{JSON.stringify(content)}</pre>
      <ArtSlider />
    </div>
  );
};

export default Home;
