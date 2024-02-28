import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ContinueReading from "@/components/ContinueReading";

const basePath = "/test";
const slug = "abc";
jest.mock("next/navigation", () => ({
  useParams() {
    return {
      slug,
    };
  },
}));

const renderContinueReading = () => {
  const progress = 0.5;
  render(<ContinueReading basePath={basePath} classList="" />);
};

describe("ContinueReading", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the link correctly", () => {
    const pageNumbers = {
      3: 3,
      4: 3,
    };

    localStorage.setItem(`${basePath}/${slug}`, JSON.stringify(pageNumbers));

    renderContinueReading();

    expect(screen.queryByText("Continue reading")).toBeInTheDocument();
    expect(
      (screen.getByText("Continue reading") as HTMLLinkElement).getAttribute(
        "href"
      )
    ).toBe(`${basePath}/${slug}/4`);
  });

  it("renders the initial link correctly", () => {
    renderContinueReading();

    expect(screen.queryByText("Start reading")).toBeInTheDocument();
    expect(
      (screen.getByText("Start reading") as HTMLLinkElement).getAttribute(
        "href"
      )
    ).toBe(`${basePath}/${slug}/1`);
  });
});
