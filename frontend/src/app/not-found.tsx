import CTALink from "@/components/CTALink";
import { Marcellus_SC } from "next/font/google";
const marcellusSC = Marcellus_SC({
  weight: ["400"],
  subsets: ["latin"],
});

const NotFoundPage = () => {
  return (
    <main className="h-screen pt-6 sm:pt-16 px-6 sm:px-8 flex justify-center">
      <div className="max-w-5xl w-full h-hull flex flex-col items-center justify-center">
        <h1
          className={
            marcellusSC.className +
            " text-3xl sm:text-6xl text-center mb-4 sm:mb-8"
          }
        >
          I haven&apos;t made the page you were looking for.
        </h1>
        <CTALink href="/" text="Back to Home" />
      </div>
    </main>
  );
};

export default NotFoundPage;
