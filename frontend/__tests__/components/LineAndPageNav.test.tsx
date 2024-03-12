import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
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
  pageRead: boolean,
  textExpanded: boolean,
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
      pageRead={pageRead}
      textExpanded={textExpanded}
      onExpandText={onExpandText}
      lines={lines}
      setPageRead={setPageRead}
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
    const pageRead = false;
    const textExpanded = false;

    renderLineAndNav(firstPage, lastPage, pageRead, textExpanded);

    expect(screen.queryByTestId("to-top-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("text-not-expanded-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("text-expanded-icon")).not.toBeInTheDocument();
    expect(screen.queryByText("The Start")).not.toBeInTheDocument();
    expect(screen.queryByTestId("prev-page-link")).toBeInTheDocument();
    expect(screen.queryByTestId("next-line-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("next-page-link")).not.toBeInTheDocument();
    expect(screen.queryByText("The End")).not.toBeInTheDocument();
  });
  it("renders with all boolean props true", () => {
    const firstPage = true;
    const lastPage = true;
    const pageRead = true;
    const textExpanded = true;

    renderLineAndNav(firstPage, lastPage, pageRead, textExpanded);

    expect(screen.queryByTestId("to-top-btn")).toBeInTheDocument();
    expect(
      screen.queryByTestId("text-not-expanded-icon")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("text-expanded-icon")).toBeInTheDocument();
    expect(screen.queryByText("The Start")).toBeInTheDocument();
    expect(screen.queryByTestId("prev-page-link")).not.toBeInTheDocument();
    expect(screen.queryByTestId("next-line-btn")).not.toBeInTheDocument();
    expect(screen.queryByTestId("next-page-link")).not.toBeInTheDocument();
    expect(screen.queryByText("The End")).toBeInTheDocument();
  });

  it("renders the next page link", () => {
    const firstPage = true;
    const lastPage = false;
    const pageRead = true;
    const textExpanded = true;

    renderLineAndNav(firstPage, lastPage, pageRead, textExpanded);

    expect(screen.queryByTestId("next-page-link")).toBeInTheDocument();
  });
  it("renders the links with appropriate urls", () => {
    const firstPage = false;
    const lastPage = false;
    const pageRead = true;
    const textExpanded = true;

    const { basePath } = renderLineAndNav(
      firstPage,
      lastPage,
      pageRead,
      textExpanded
    );

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
  it("to top button goes to top", () => {
    const firstPage = true;
    const lastPage = true;
    const pageRead = true;
    const textExpanded = false;

    const { goToLine, setPageRead } = renderLineAndNav(
      firstPage,
      lastPage,
      pageRead,
      textExpanded
    );
    fireEvent.click(screen.getByTestId("to-top-btn"));

    expect(goToLine).toHaveBeenCalledWith(0);
    expect(setPageRead).toHaveBeenCalledWith(false);
  });
  it("to top button goes to top and closes the expanded text", () => {
    const firstPage = true;
    const lastPage = true;
    const pageRead = true;
    const textExpanded = true;

    const { setPageRead, goToLine } = renderLineAndNav(
      firstPage,
      lastPage,
      pageRead,
      textExpanded
    );
    fireEvent.click(screen.getByTestId("to-top-btn"));

    expect(setPageRead).toHaveBeenCalledWith(false);
    expect(goToLine).toHaveBeenCalledWith(0);
  });
  it("expand text button expands text", () => {
    const firstPage = true;
    const lastPage = true;
    const pageRead = true;
    const textExpanded = false;

    const { onExpandText, currentIndex } = renderLineAndNav(
      firstPage,
      lastPage,
      pageRead,
      textExpanded
    );
    fireEvent.click(screen.getByTestId("expand-text-btn"));

    expect(onExpandText).toHaveBeenCalledWith(currentIndex);
  });
  it("next line button goes to next line", () => {
    const firstPage = false;
    const lastPage = false;
    const pageRead = false;
    const textExpanded = false;

    const { goToLine, currentIndex } = renderLineAndNav(
      firstPage,
      lastPage,
      pageRead,
      textExpanded
    );
    fireEvent.click(screen.getByTestId("next-line-btn"));

    expect(goToLine).toHaveBeenCalledWith(currentIndex + 1);
  });
});
