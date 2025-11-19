import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import BackNav from "@/components/BackNav";

const basePath = "/test";
const slug = "abc";
jest.mock("next/navigation", () => ({
  useParams() {
    return {
      slug,
    };
  },
}));

const renderBackNav = (links: { url: string; txt: string }[]) => {
  render(<BackNav links={links} />);
};

describe("BackNav", () => {
  it("renders the links correctly", () => {
    const links = [
      { url: "/", txt: "Home" },
      { url: "/stories", txt: "Stories" },
    ];

    renderBackNav(links);

    expect(screen.getAllByTestId("back-link").length).toBe(2);
    expect(screen.getAllByTestId("back-link")[0].getAttribute("href")).toBe(
      links[0].url
    );
    expect(screen.getAllByTestId("back-link")[0].textContent).toBe(
      links[0].txt
    );
    expect(screen.getAllByTestId("back-link")[1].getAttribute("href")).toBe(
      links[1].url
    );
    expect(screen.getAllByTestId("back-link")[1].textContent).toBe(
      links[1].txt
    );
  });
});
