import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ProgressBar from "@/components/ProgressBar";

const renderProgressBar = (): { progress: number } => {
  const progress = 0.5;
  render(<ProgressBar progress={progress} />);

  return {
    progress,
  };
};

describe("ProgressBar", () => {
  it("renders the progress correctly", () => {
    const { progress } = renderProgressBar();

    expect(screen.getByTestId("progress-bar").style.transform).toBe(
      `scaleX(${progress}`
    );
  });
});
