import { workSans } from "@/app/layout";
import ImgEl from "@/components/ImgEl";

interface Props {}

const Highlights = ({}: Props) => {
  return (
    <section>
      <h1 className={workSans.className + " big-heading"}>Today's Highlight</h1>
      <div className="flex gap-2 mb-12 pb-12 pt-6 px-12">
        <ImgEl src="/paintings/primary.jpg" alt="Bla" actual />
        <ImgEl src="/paintings/suddendivorce.jpg" alt="Bla" actual />
      </div>
    </section>
  );
};

export default Highlights;
