import stories from "../../src/utils/fixtures/stories.json";
import { Story } from "../../src/app/stories/[slug]/page";

describe("Story", () => {
  it("should display the story", () => {
    cy.visit("http://localhost:3000/stories");
    const firstStory: Story = stories.list[0];

    cy.get("a").eq(1).trigger("click");
    cy.url().should("include", `/stories/${firstStory.slug.current}`);

    cy.get("h1").contains(firstStory.title);
    cy.get("a").eq(2).contains("Read Here");
    cy.get("a").eq(3).contains("Read The PDF");

    cy.get("button").click();
    cy.get("a").eq(0).click();
    cy.url().should("eq", `http://localhost:3000/`);

    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}`);

    cy.get("button").click();
    cy.get("a").eq(1).click();
    cy.url().should("eq", `http://localhost:3000/stories`);
  });
  it("should display not found", () => {
    cy.visit("http://localhost:3000/stories/story11", {
      failOnStatusCode: false,
    });
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("h1").contains("Page not found (nor its meaning)");
  });
});
