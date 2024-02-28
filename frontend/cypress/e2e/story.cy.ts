import stories from "../../src/utils/fixtures/stories.json";
import { Story } from "../../src/app/stories/[slug]/page";

describe("Story", () => {
  it("should display the story", () => {
    cy.visit("http://localhost:3000/stories");
    const firstStory: Story = stories.list[0];

    cy.get("a:first").trigger("click");
    cy.url().should("include", `/stories/${firstStory.slug.current}`);

    cy.get("h1").contains(firstStory.title);
    cy.get("a:first").contains("Start reading");
    cy.get("a:last").trigger("click");
    cy.url().should("eq", `http://localhost:3000/stories`);
  });
  it("should display not found", () => {
    cy.visit("http://localhost:3000/stories/story11", {
      failOnStatusCode: false,
    });
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("h1").contains("404");
  });
});
