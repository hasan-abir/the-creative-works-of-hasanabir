import { client } from "@/lib/sanity/client";
import Link from "next/link";

interface Data {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
}

const Stories = async () => {
  const stories = await client.fetch<Data[]>(`*[_type == "story"]{
    _id, title, excerpt, slug
  }`);

  return (
    <div>
      {stories.map((story) => {
        return (
          <div key={story._id}>
            <h1>{story.title}</h1>
            <p>{story.excerpt}</p>
            <Link href={"/stories/" + story.slug.current}>View</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
