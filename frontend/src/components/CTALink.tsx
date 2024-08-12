import Link from "next/link";
import { PlaySolid } from "iconoir-react";

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
        "inline-block uppercase font-bold text-center text-sm sm:text-xl text-dark-200 bg-primary-50 px-2 sm:px-4 py-1 sm:py-2 rounded" +
        (extraClasses && " " + extraClasses)
      }
    >
      <span className="mr-2 sm:mr-4">{text}</span>
      <PlaySolid className="inline text-xs sm:text-sm" />
    </Link>
  );
};

export default CTALink;
