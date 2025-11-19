import { StoryInAList } from "../../src/app/stories/page";
import stories from "../../src/utils/fixtures/stories.json";

describe("Stories", () => {
  it("should display all the stories", () => {
    cy.visit("http://localhost:3000/stories");

    let i = 0;
    while (i < stories.list.length) {
      const story: StoryInAList = stories.list[i];

      cy.get("h2").contains(story.title);

      i++;
    }
    cy.get("button:first").click()
    cy.get("a:first").click()
    cy.url().should("eq", `http://localhost:3000/`)
  });
});
