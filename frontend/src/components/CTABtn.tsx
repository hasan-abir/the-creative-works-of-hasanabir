interface Props {
  children: React.ReactNode | string;
  block?: boolean;
  extraClasses?: string;
}

const CTABtn = ({ children, block = false }: Props) => {
  let classList = "px-4 py-3 rounded-lg bg-red-400";

  if (block) {
    classList += " w-full";
  }

  return <button className={classList}>{children}</button>;
};

export default CTABtn;
