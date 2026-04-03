import { headingFont } from "@/utils/fonts";
import ImgEl from "@/components/ImgEl";
import Card from "@/components/Card";
import CTABtn from "@/components/CTABtn";
import AudioPlayer from "@/components/AudioPlayer";
import { Book, Painting, Song } from "@/lib/remark/getContent";
import { icons } from "@/utils/icons";

interface Props {
  content: Book | Painting | Song;
  customHeading?: string;
}

const Highlights = ({
  content,
  customHeading = "Today's Highlight",
}: Props) => {
  return (
    <section id="highlights" className="sm:mt-48">
      <h1 className={headingFont.className + " big-heading"}>
        {customHeading}
      </h1>
      <div className="flex flex-col sm:flex-row mb-12 sm:pb-12 pt-6 sm:px-12">
        {"cover_image" in content || "thumbnail" in content ? (
          <ImgEl
            src={
              "cover_image" in content ? content.cover_image : content.thumbnail
            }
            alt="highlighted project"
            actual
          />
        ) : (
          <Card fullWidth>
            <AudioPlayer fullWidth song={content} />
          </Card>
        )}

        <div className="py-5 px-0 sm:px-7 flex-none sm:flex-1">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-2">
            {content.title}
          </h2>
          <p className="opacity-75 text-sm sm:text-base mb-4 sm:mb-8">
            {"published_date" in content
              ? "Published in " + new Date(content.published_date).getFullYear()
              : "Finished in " + new Date(content.date_created).getFullYear()}
          </p>
          {"content" in content && content.content.length > 0 ? (
            <p className="mb-8 sm:mb-16 line-clamp-5 max-w-[500px] leading-relaxed text-sm sm:text-base">
              {content.content}
            </p>
          ) : null}

          {"amazon_link" in content ? (
            <CTABtn
              primary={false}
              extraClasses="w-[160px] sm:w-[200px]"
              href={content.amazon_link}
            >
              <span className="flex items-center justify-center">
                <span>Read more</span>
                <icons.RightIcon />
              </span>
            </CTABtn>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
