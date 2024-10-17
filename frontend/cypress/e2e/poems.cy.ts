import { PoemsInAList } from "../../src/app/poems/page";
import poems from "../../src/utils/fixtures/poems.json";

describe("Stories", () => {
  it("should display all the poems", () => {
    cy.visit("http://localhost:3000/poems");

    let i = 0;
    while (i < poems.list.length) {
      const poem: PoemsInAList = poems.list[i];

      cy.get("h2").contains(poem.title);

      i++;
    }
    cy.get("button:first").click();
    cy.get("a:first").click();
    cy.url().should("eq", `http://localhost:3000/`);
  });
});
