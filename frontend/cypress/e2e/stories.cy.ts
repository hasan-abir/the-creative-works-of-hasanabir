import { StoryInAList } from "../../src/app/stories/page";
import stories from "../../src/utils/fixtures/stories.json";

describe("Stories", () => {
  it("should display all the stories", () => {
    cy.visit("http://localhost:3000/stories");

    let i = 0;
    while (i < stories.list.length) {
      const story: StoryInAList = stories.list[i];

      cy.get("h1").contains(story.title);
      cy.get("p").contains(`${story.excerpt} ...`);
      cy.get("a").contains("View");

      i++;
    }
  });
});
