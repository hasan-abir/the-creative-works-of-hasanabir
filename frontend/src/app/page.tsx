import TodaysHighlight from "@/components/TodaysHighlight";

export default function Home() {
  return (
    <div className="page-container">
      <section>
        <h1>Today's Highlight</h1>
        <TodaysHighlight />
        <h1>Short Stories</h1>
        {/* list of content el */}
        <h1>Paintings</h1>
        {/* list of content el */}
        <h1>Poems</h1>
        {/* list of content el */}
        <h1>Songs</h1>
        {/* list of content el */}
      </section>
    </div>
  );
}
