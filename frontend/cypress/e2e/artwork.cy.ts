describe("Artwork", () => {
  it("should display the artwork", () => {
    cy.visit("http://localhost:3000/artwork");
    cy.get("h1").eq(0).contains("Artwork");

    cy.get("button").click();
    cy.get("a").eq(0).click();
    cy.url().should("eq", `http://localhost:3000/`);
  });
});
