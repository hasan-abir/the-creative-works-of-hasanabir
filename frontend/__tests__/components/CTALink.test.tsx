import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CTALink from "@/components/CTALink";

const renderCTALink = ({
  href,
  text,
  target,
  extraClasses,
}: {
  href: string;
  text: string;
  target: string;
  extraClasses: string;
}) => {
  render(
    <CTALink
      href={href}
      text={text}
      target={target}
      extraClasses={extraClasses}
    />
  );
};

describe("CTALink", () => {
  it("renders the progress correctly", () => {
    const text = "Example";
    const href = "/stories";
    const target = "_blank";
    const extraClasses = "mb-4";

    renderCTALink({ text, href, target, extraClasses });

    expect(screen.getByText(text).getAttribute("href")).toBe(href);
    expect(screen.getByText(text).getAttribute("target")).toBe(target);
    expect(screen.getByText(text).classList.contains(extraClasses)).toBe(true);
  });
});
