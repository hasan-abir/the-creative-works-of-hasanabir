import stories from "../../src/utils/fixtures/stories.json";
import { Story } from "../../src/app/stories/[slug]/page";

describe("Story Page", () => {
  it("should display the story page", () => {
    cy.visit("http://localhost:3000/stories");
    const firstStory: Story = stories.list[0];

    cy.get("a:first").trigger("click");
    cy.url().should("include", `/stories/${firstStory.slug.current}`);

    cy.get("h1").contains(firstStory.title);
    cy.get("a:first").contains("Start reading");
    cy.get("a:first").trigger("click");
    cy.url().should("include", `/stories/${firstStory.slug.current}/1`);
    cy.get("h1").contains(firstStory.title);
    cy.get("p:first").contains("1 of 3");
    cy.get("p:nth-child(2)").contains("Written by Hasan Abir");
    cy.get(".line:first").contains("The beginning");
    cy.get(".line:first").should("be.visible");
  });
  it("should display not found", () => {
    cy.visit("http://localhost:3000/stories/story1/4", {
      failOnStatusCode: false,
    });
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("h1").contains("404");
  });
});
