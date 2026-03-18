import Link from "next/link";

interface Props {
  primary?: boolean;
  children: React.ReactNode | string;
  block?: boolean;
  extraClasses?: string;
  onClick?: (arg?: any) => void;
  href?: string;
  newTab?: boolean;
  rounded?: "lg" | "xl";
}

const CTABtn = ({
  primary = true,
  children,
  block = false,
  extraClasses,
  onClick,
  href,
  newTab = true,
  rounded = "lg",
}: Props) => {
  let classList = primary ? "primary-btn" : "secondary-btn";

  classList += ` rounded-${rounded}`;

  if (block) {
    classList += " w-full";
  }

  if (extraClasses) {
    classList += " " + extraClasses;
  }

  if (href) {
    return (
      <Link
        href={href}
        className={classList}
        target={newTab ? "_blank" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick || undefined} className={classList}>
      {children}
    </button>
  );
};

export default CTABtn;
