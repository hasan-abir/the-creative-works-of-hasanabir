import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LineAndPageNav from "@/components/LineAndPageNav";

jest.mock("next/navigation", () => ({
  useParams() {
    return {
      slug: "abc",
      page: "1",
    };
  },
}));

jest.doMock("../../src/components/ProgressBar", () => <div>ProgressBar</div>);

describe("Page", () => {
  it("renders with all boolean props false", () => {
    const currentIndex = 0;
    const firstPage = false;
    const lastPage = false;
    const pageRead = false;
    const textExpanded = false;
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
        basePath="/test"
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
    const currentIndex = 0;
    const firstPage = true;
    const lastPage = true;
    const pageRead = true;
    const textExpanded = true;
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
        basePath="/test"
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
});
