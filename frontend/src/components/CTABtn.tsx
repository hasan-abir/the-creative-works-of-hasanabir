interface Props {
  children: React.ReactNode | string;
  block?: boolean;
  extraClasses?: string;
  onClick?: () => void;
}

const CTABtn = ({ children, block = false, extraClasses, onClick }: Props) => {
  let classList = "primary-btn";

  if (block) {
    classList += " w-full rounded-[16px]";
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
