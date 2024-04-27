import Link from "next/link";
import { Marcellus_SC } from "next/font/google";

const marcellusSC = Marcellus_SC({
  weight: ["400"],
  subsets: ["latin"],
});

interface Props {
  text: string;
  href: string;
  target?: string;
  extraClasses?: string;
}

const CTALink = ({ text, href, target, extraClasses = "" }: Props) => {
  return (
    <Link
      href={href}
      target={target ? target : undefined}
      className={
        marcellusSC.className +
        " inline-block text-center py-2 px-6 bg-light-50 dark:bg-dark-200 border-2 border-b-0 border-dark-300 dark:border-dark-50 text-lg sm:text-2xl relative after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-1 after:bg-primary-50 after:ring-2 after:ring-dark-300 after:dark:ring-dark-50 hover:translate-y-[-0.3rem] transition-transform" +
        (extraClasses && " " + extraClasses)
      }
    >
      {text}
    </Link>
  );
};

export default CTALink;
