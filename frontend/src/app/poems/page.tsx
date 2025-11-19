import PoemsHero from "@/components/PoemsHero";
import { fetchData } from "@/lib/sanity/client";

export interface PoemsInAList {
  _id: string;
  title: string;
  finishedAt: string;
  slug: { current: string };
}

const Poems = async () => {
  const poems = await fetchData<PoemsInAList[]>(`*[_type == "poem"]{
    _id, title, slug, finishedAt
  } | order(finishedAt desc)`);

  return (
    <div className="page-container">
      <PoemsHero poems={poems} />
    </div>
  );
};

export default Poems;
