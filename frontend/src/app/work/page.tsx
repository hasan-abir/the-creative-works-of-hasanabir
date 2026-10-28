import Link from "next/link";

export let content: { id: number; title: string; slug: string }[] = [
  { id: 123, title: "Test 1", slug: "test-1" },
  { id: 213, title: "Test 2", slug: "test-2" },
  { id: 312, title: "Test 3", slug: "test-3" },
];

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
