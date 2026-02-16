interface Props {
  primary?: boolean;
  children: React.ReactNode | string;
  block?: boolean;
  extraClasses?: string;
  onClick?: () => void;
}

const CTABtn = ({
  primary = true,
  children,
  block = false,
  extraClasses,
  onClick,
}: Props) => {
  let classList = primary ? "primary-btn" : "secondary-btn";

  if (block) {
    classList += " w-full";
  }

  if (extraClasses) {
    classList += " " + extraClasses;
  }

  return (
    <button onClick={onClick || undefined} className={classList}>
      {children}
    </button>
  );
};

export default CTABtn;
