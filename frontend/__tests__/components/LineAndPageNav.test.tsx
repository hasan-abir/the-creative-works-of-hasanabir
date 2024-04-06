import "@testing-library/jest-dom";
import { fireEvent, render, screen, act } from "@testing-library/react";
import LineAndPageNav from "@/components/LineAndPageNav";

const slug = "abc";
const page = "1";
jest.mock("next/navigation", () => ({
  useParams() {
    return {
      slug,
      page,
    };
  },
}));

jest.doMock("../../src/components/ProgressBar", () => <div>ProgressBar</div>);

const renderLineAndNav = (
  firstPage: boolean,
  lastPage: boolean,
  currentIndex: number = 0
): {
  basePath: string;
  currentIndex: number;
  setPageRead: jest.Mock;
  goToLine: jest.Mock;
  onExpandText: jest.Mock;
} => {
  const basePath = "/test";
  const paraEls = render(
    <div>
      <p>A line</p>
      <p>Another line</p>
      <p>Last line</p>
    </div>
  );
  const lines = Array.from(paraEls.container.getElementsByTagName("p"));
  const setPageRead = jest.fn();
  const goToLine = jest.fn();
  const onExpandText = jest.fn();

  render(
    <LineAndPageNav
      basePath={basePath}
      currentIndex={currentIndex}
      firstPage={firstPage}
      lastPage={lastPage}
      linesLength={lines.length}
      currentText={lines[0].textContent || ""}
      goToLine={goToLine}
    />
  );
  return {
    basePath,
    currentIndex,
    setPageRead,
    onExpandText,
    goToLine,
  };
};

describe("LineAndPageNav", () => {
  it("renders with all boolean props false", () => {
    const firstPage = false;
    const lastPage = false;

    renderLineAndNav(firstPage, lastPage);

    expect(screen.queryByText("The Start")).not.toBeInTheDocument();
    expect(screen.queryByTestId("prev-page-link")).toBeInTheDocument();
    expect(screen.queryByTestId("prev-line-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("next-line-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("next-page-link")).toBeInTheDocument();
    expect(screen.queryByText("The End")).not.toBeInTheDocument();
  });
  it("renders with all boolean props true", () => {
    const firstPage = true;
    const lastPage = true;

    renderLineAndNav(firstPage, lastPage);

    expect(screen.queryByText("The Start")).toBeInTheDocument();
    expect(screen.queryByTestId("prev-page-link")).not.toBeInTheDocument();
    expect(screen.queryByTestId("prev-line-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("next-line-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("next-page-link")).not.toBeInTheDocument();
    expect(screen.queryByText("The End")).toBeInTheDocument();
  });

  it("renders the next page link", () => {
    const firstPage = true;
    const lastPage = false;

    renderLineAndNav(firstPage, lastPage);

    expect(screen.queryByTestId("next-page-link")).toBeInTheDocument();
  });
  it("renders the links with appropriate urls", () => {
    const firstPage = false;
    const lastPage = false;

    const { basePath } = renderLineAndNav(firstPage, lastPage);

    expect(
      screen
        .queryByTestId<HTMLLinkElement>("prev-page-link")
        ?.getAttribute("href")
    ).toBe(`${basePath}/${slug}/${parseInt(page) - 1}`);
    expect(
      screen
        .queryByTestId<HTMLLinkElement>("next-page-link")
        ?.getAttribute("href")
    ).toBe(`${basePath}/${slug}/${parseInt(page) + 1}`);
  });
  it("prev line button goes to prev line", () => {
    const firstPage = false;
    const lastPage = false;

    const { goToLine } = renderLineAndNav(firstPage, lastPage);
    fireEvent.click(screen.getByTestId("prev-line-btn"));

    expect(goToLine).toHaveBeenCalledWith(false, true);
  });
  it("next line button goes to next line", () => {
    const firstPage = false;
    const lastPage = false;

    const { goToLine } = renderLineAndNav(firstPage, lastPage);
    fireEvent.click(screen.getByTestId("next-line-btn"));

    expect(goToLine).toHaveBeenCalledWith(true);
  });
  it("autoplay triggers and renders as expected", () => {
    const firstPage = false;
    const lastPage = false;

    const { goToLine, currentIndex } = renderLineAndNav(firstPage, lastPage);

    expect(screen.queryByTestId("autoplay-icon")).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId("autoplay-btn"));
    });

    const msToWait = 600;

    expect(screen.queryByTestId("autoplay-pause-icon")).toBeInTheDocument();
    setTimeout(() => {
      expect(goToLine).toHaveBeenCalledWith(true);
    }, msToWait);

    act(() => {
      fireEvent.click(screen.getByTestId("autoplay-btn"));
    });

    expect(screen.queryByTestId("autoplay-icon")).toBeInTheDocument();
  });
});
