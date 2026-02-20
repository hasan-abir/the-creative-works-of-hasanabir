import { headingFont } from "@/utils/fonts";
import ImgEl from "@/components/ImgEl";
import Card from "@/components/Card";
import CTABtn from "@/components/CTABtn";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import dynamic from "next/dynamic";
const AudioPlayer = dynamic(() => import("@/components/AudioPlayer"), {
  ssr: false,
});

interface Props {
  content: Book | Painting | Song;
}

const Highlights = ({ content }: Props) => {
  return (
    <section>
      <h1 className={headingFont.className + " big-heading"}>
        Today's Highlight
      </h1>
      <div className="flex mb-12 pb-12 pt-6 px-12">
        {"cover_image" in content || "thumbnail" in content ? (
          <ImgEl
            src={
              "cover_image" in content ? content.cover_image : content.thumbnail
            }
            alt="Bla"
            actual
          />
        ) : (
          <Card>
            <AudioPlayer song={content} />
          </Card>
        )}

        <div className="py-5 px-7 flex-1">
          <h2 className="text-4xl font-semibold mb-2">{content.title}</h2>
          <p className="opacity-75 mb-8">
            Published in{" "}
            {"published_date" in content
              ? new Date(content.published_date).getFullYear()
              : new Date(content.date_created).getFullYear()}
          </p>
          <p className="mb-16">
            {"content" in content ? content.content : null}
          </p>
          <CTABtn primary={false}>
            <span className="flex items-center justify-center">
              <span>Discover</span>
              <svg
                className="ml-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.3331 8.66682L1.33301 7.33355H12.1143L9.48114 4.70037L10.4239 3.75757L14.6666 8.00022L10.4239 12.2429L9.48114 11.3L12.1143 8.66688L1.3331 8.66682Z"
                  fill="#505151"
                />
              </svg>
            </span>
          </CTABtn>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
