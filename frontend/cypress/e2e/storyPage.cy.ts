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
    cy.get(".line:first").contains("The beginning");
    cy.get(".line:first").should("be.visible");
  });
  it("should navigate lines and pages properly", () => {
    const firstStory: Story = stories.list[0];
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/1`);
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(0).contains("The beginning");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(1).should("be.visible");
    cy.get(".line")
      .eq(1)
      .contains("I’d like to honor an event REALLY, if God allows me to.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(2).should("be.visible");
    cy.get(".line").eq(2).contains("His boss will be mad at the meeting.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(3).should("be.visible");
    cy.get(".line").eq(3).contains("You don't need 20 captains.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(4).should("be.visible");
    cy.get(".line").eq(4).contains("Every child likes an ice cream.");
    cy.get(`[data-testid="next-page-link"]`).should("be.visible");
    cy.get(`[data-testid="next-page-link"]`).trigger("click");
    cy.url().should("include", `/stories/${firstStory.slug.current}/2`);
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(0).contains("The middeling");
    cy.get(`[data-testid="prev-page-link"]`).should("be.visible");
    cy.get(`[data-testid="prev-page-link"]`).trigger("click");
    cy.url().should("include", `/stories/${firstStory.slug.current}/1`);
    cy.wait(1000);
    cy.get(".line").eq(4).should("be.visible");
    cy.get(`[data-testid="to-top-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
  });
  it("should indicate the start and end of a story properly", () => {
    const firstStory: Story = stories.list[0];
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/1`);
    cy.wait(1000);
    cy.get("p").eq(7).contains("The Start");
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/3`);
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.get("p").eq(7).contains("The End");
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
