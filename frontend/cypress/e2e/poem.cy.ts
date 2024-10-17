import poems from "../../src/utils/fixtures/poems.json";
import { Poem } from "../../src/app/poems/[slug]/page";

describe("Poem", () => {
  it("should display the poem", () => {
    cy.visit("http://localhost:3000/poems");
    const firstPoem: Poem = poems.list[0];

    cy.get("a").eq(1).trigger("click");
    cy.url().should("include", `/poems/${firstPoem.slug.current}`);

    cy.get("h1").contains(firstPoem.title);
    cy.get("a").eq(2).contains("Read The PDF");
    cy.get("p").eq(1).contains("The beginning");

    cy.get("button").click();
    cy.get("a").eq(0).click();
    cy.url().should("eq", `http://localhost:3000/`);

    cy.visit(`http://localhost:3000/poems/${firstPoem.slug.current}`);

    cy.get("button").click();
    cy.get("a").eq(1).click();
    cy.url().should("eq", `http://localhost:3000/poems`);
  });
  it("should display not found", () => {
    cy.visit("http://localhost:3000/poems/poem11", {
      failOnStatusCode: false,
    });
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("h1").contains("Page not found (nor its meaning)");
  });
});
