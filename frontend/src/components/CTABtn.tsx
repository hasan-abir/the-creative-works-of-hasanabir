interface Props {
  children: React.ReactNode | string;
  extraClasses?: string;
}

const CTABtn = ({ children }: Props) => {
  return <button>{children}</button>;
};

export default CTABtn;
