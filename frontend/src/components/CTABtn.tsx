interface Props {
  children: React.ReactNode | string;
  block?: boolean;
  extraClasses?: string;
}

const CTABtn = ({ children, block = false, extraClasses }: Props) => {
  let classList = "primary-btn";

  if (block) {
    classList += " w-full rounded-[16px]";
  }

  if (extraClasses) {
    classList += " " + extraClasses;
  }

  return <button className={classList}>{children}</button>;
};

export default CTABtn;
