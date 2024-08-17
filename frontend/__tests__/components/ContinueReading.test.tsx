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

    expect(screen.queryByText("Continue Reading")).toBeInTheDocument();
    expect(
      (
        screen.getByText("Continue Reading") as HTMLSpanElement
      ).parentElement?.parentElement?.getAttribute("href")
    ).toBe(`${basePath}/${slug}/4`);
  });

  it("renders the initial link correctly", () => {
    renderContinueReading();

    expect(screen.queryByText("Read Here")).toBeInTheDocument();
    expect(
      (
        screen.getByText("Read Here") as HTMLSpanElement
      ).parentElement?.parentElement?.getAttribute("href")
    ).toBe(`${basePath}/${slug}/1`);
  });
});
