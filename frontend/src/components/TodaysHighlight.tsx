"use client";
import Thumbnail from "@/components/Thumbnail";

const TodaysHighlight = () => {
  return (
    <article className="flex mb-12">
      <Thumbnail src="/suddendivorce.jpg" alt="Sudden Divorce" />
      <div className="card-head flex-1 ml-8">
        <h2>
          Title of the project <span>(2025)</span>
        </h2>
        <p>
          A <span className="font-bold">Category</span> by{" "}
          <span className="font-bold">Author Name</span>
        </p>
      </div>
    </article>
  );
};

export default TodaysHighlight;
