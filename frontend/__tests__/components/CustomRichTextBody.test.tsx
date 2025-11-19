import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomRichTextBody from "@/components/CustomRichTextBody";
import storyPages from "@/utils/fixtures/story_pages.json";

const renderCustomRichTextBody = () => {
  render(
    <CustomRichTextBody body={storyPages.list[0].body} classList="line" />
  );
};

describe("CustomRichTextBody", () => {
  it("renders the body correctly", () => {
    renderCustomRichTextBody();

    const paragraphs = screen.queryAllByTestId("paragraph");
    const italics = screen.queryAllByTestId("italic");
    const bolds = screen.queryAllByTestId("bold");

    paragraphs.forEach((para) => {
      expect(para.classList.contains("line")).toBe(true);
    });

    expect(paragraphs[0].textContent).toBe("The beginning");
    expect(paragraphs[1].textContent).toBe(
      "I’d like to honor an event REALLY, if God allows me to."
    );
    expect(paragraphs[2].textContent).toBe(
      "His boss will be mad at the meeting."
    );
    expect(paragraphs[3].textContent).toBe("You don't need 20 captains.");
    expect(paragraphs[4].textContent).toBe("Every child likes an ice cream.");

    expect(italics[0].textContent).toBe("REALLY");
    expect(bolds[0].textContent).toBe("The beginning");
  });
});
