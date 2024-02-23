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
  setTextExpanded: jest.Mock;
  setCurrentIndex: jest.Mock;
  setPageRead: jest.Mock;
  goToLine: jest.Mock;
} => {
  const basePath = "/test";
  const divEl = render(<div>Container</div>);
  const paraEls = render(
    <div>
      <p>A line</p>
      <p>Another line</p>
      <p>Last line</p>
    </div>
  );
  const lines = Array.from(paraEls.container.getElementsByTagName("p"));
  const setTextExpanded = jest.fn();
  const setCurrentIndex = jest.fn();
  const setPageRead = jest.fn();
  const goToLine = jest.fn();

  render(
    <LineAndPageNav
      basePath={basePath}
      currentIndex={currentIndex}
      firstPage={firstPage}
      lastPage={lastPage}
      pageRead={pageRead}
      textExpanded={textExpanded}
      container={divEl.container as HTMLDivElement}
      lines={lines}
      contextSafe={jest.fn().mockImplementation((cb) => cb)}
      setTextExpanded={setTextExpanded}
      setCurrentIndex={setCurrentIndex}
      setPageRead={setPageRead}
      goToLine={goToLine}
    />
  );
  return {
    basePath,
    currentIndex,
    setTextExpanded,
    setCurrentIndex,
    setPageRead,
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

  it("renders the next line btn", () => {
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

    const { setTextExpanded, goToLine, setCurrentIndex, setPageRead } =
      renderLineAndNav(firstPage, lastPage, pageRead, textExpanded);
    fireEvent.click(screen.getByTestId("to-top-btn"));

    expect(setTextExpanded).not.toHaveBeenCalled();
    expect(goToLine).toHaveBeenCalledWith(0);
    expect(setCurrentIndex).toHaveBeenCalledWith(1);
    expect(setPageRead).toHaveBeenCalledWith(false);
  });
  it("to top button goes to top and closes the expanded text", () => {
    const firstPage = true;
    const lastPage = true;
    const pageRead = true;
    const textExpanded = true;

    const { setTextExpanded } = renderLineAndNav(
      firstPage,
      lastPage,
      pageRead,
      textExpanded
    );
    fireEvent.click(screen.getByTestId("to-top-btn"));

    expect(setTextExpanded).toHaveBeenCalledWith(false);
  });
  it("expand text button expands text", () => {
    const firstPage = true;
    const lastPage = true;
    const pageRead = true;
    const textExpanded = false;

    const { setTextExpanded } = renderLineAndNav(
      firstPage,
      lastPage,
      pageRead,
      textExpanded
    );
    fireEvent.click(screen.getByTestId("expand-text-btn"));

    expect(setTextExpanded).toHaveBeenCalledWith(true);
  });
  it("expand text button collapses text", () => {
    const firstPage = true;
    const lastPage = true;
    const pageRead = true;
    const textExpanded = true;

    const { currentIndex, setTextExpanded, goToLine } = renderLineAndNav(
      firstPage,
      lastPage,
      pageRead,
      textExpanded
    );
    fireEvent.click(screen.getByTestId("expand-text-btn"));

    expect(goToLine).toHaveBeenCalledWith(currentIndex - 1, false);
    expect(setTextExpanded).toHaveBeenCalledWith(false);
  });
  it("next line button goes to next line", () => {
    const firstPage = false;
    const lastPage = false;
    const pageRead = false;
    const textExpanded = false;

    const {
      currentIndex,
      setCurrentIndex,
      goToLine,
      setTextExpanded,
      setPageRead,
    } = renderLineAndNav(firstPage, lastPage, pageRead, textExpanded);
    fireEvent.click(screen.getByTestId("next-line-btn"));

    expect(setTextExpanded).not.toHaveBeenCalled();
    expect(setPageRead).not.toHaveBeenCalled();
    expect(goToLine).toHaveBeenCalledWith(currentIndex);
    expect(setCurrentIndex).toHaveBeenCalledWith(currentIndex + 1);
  });
  it("next line button goes to next line and collapses expanded text along with setting page read value", () => {
    const firstPage = false;
    const lastPage = false;
    const pageRead = false;
    const textExpanded = true;

    const {
      currentIndex,
      setCurrentIndex,
      goToLine,
      setTextExpanded,
      setPageRead,
    } = renderLineAndNav(firstPage, lastPage, pageRead, textExpanded, 2);
    fireEvent.click(screen.getByTestId("next-line-btn"));

    expect(setTextExpanded).toHaveBeenCalledWith(false);
    expect(setPageRead).toHaveBeenCalledWith(true);
    expect(goToLine).toHaveBeenCalledWith(currentIndex);
    expect(setCurrentIndex).toHaveBeenCalledWith(currentIndex + 1);
  });
});
