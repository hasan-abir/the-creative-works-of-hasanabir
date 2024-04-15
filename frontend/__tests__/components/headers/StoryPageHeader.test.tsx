import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StoryPageHeader from "@/components/headers/StoryPageHeader";

describe("Page", () => {
  it("renders based on props", () => {
    const title = "Test title";
    const page = 1;
    const pageCount = 2;

    render(
      <StoryPageHeader
        title="Test title"
        slug="test-title"
        page={page}
        pageCount={pageCount}
      />
    );

    expect(screen.queryAllByText(title).length).toBe(2);
    expect(screen.queryByText(`${page} of ${pageCount}`)).toBeInTheDocument();
  });
});
