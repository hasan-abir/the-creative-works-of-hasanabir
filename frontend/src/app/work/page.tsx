import Link from "next/link";
import content from "@/app/work/content";

const Work = () => {
  return (
    <div className="page-container min-h-screen px-6">
      {content.map((item) => (
        <div key={item.id}>
          <Link href={`/work/${item.slug}`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Work;
