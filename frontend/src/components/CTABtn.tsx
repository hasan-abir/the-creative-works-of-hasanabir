interface Props {
  children: React.ReactNode | string;
  block?: boolean;
  extraClasses?: string;
}

const CTABtn = ({ children, block = false }: Props) => {
  let classList = "primary-btn";

  if (block) {
    classList += " w-full";
  }

  return <button className={classList}>{children}</button>;
};

export default CTABtn;
