import stories from "../../src/utils/fixtures/stories.json";
import { Story } from "../../src/app/stories/[slug]/page";

describe("Story Page", () => {
  it("should display the story page", () => {
    cy.visit("http://localhost:3000/stories");
    const firstStory: Story = stories.list[0];

    cy.get("a").eq(1).trigger("click");
    cy.url().should("include", `/stories/${firstStory.slug.current}`);

    cy.get("h1").contains(firstStory.title);
    cy.get("a").eq(2).contains("Read Here");
    cy.get("a").eq(2).trigger("click");
    cy.url().should("include", `/stories/${firstStory.slug.current}/1`);
    cy.get("h1").contains(firstStory.title);
    cy.get("p").eq(1).contains("1 of 3");
    cy.get(".line:first").contains("The beginning");
    cy.get(".line:first").should("be.visible");
  });
  it("should navigate lines and pages properly on mobile", () => {
    cy.viewport("iphone-6")

    const firstStory: Story = stories.list[0];
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/1`);
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(0).contains("The beginning");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(1).should("be.visible");
    cy.get(".line")
      .eq(1)
      .contains("I’d like to honor an event REALLY, if God allows me to.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(1).should("be.visible");
    cy.get(".line").eq(2).should("be.visible");
    cy.get(".line").eq(2).contains("His boss will be mad at the meeting.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(2).should("be.visible");
    cy.get(".line").eq(3).should("be.visible");
    cy.get(".line").eq(3).contains("You don't need 20 captains.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(3).should("be.visible");
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
    cy.get(".line").eq(3).should("be.visible");
    cy.get(".line").eq(4).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(2).should("be.visible");
    cy.get(".line").eq(3).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(1).should("be.visible");
    cy.get(".line").eq(2).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(1).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(1).should("not.be.visible");
  })
  it("should navigate lines and pages properly", () => {
    const firstStory: Story = stories.list[0];
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/1`);
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(0).contains("The beginning");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(1).should("be.visible");
    cy.get(".line")
      .eq(1)
      .contains("I’d like to honor an event REALLY, if God allows me to.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(1).should("be.visible");
    cy.get(".line").eq(2).should("be.visible");
    cy.get(".line").eq(2).contains("His boss will be mad at the meeting.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(2).should("be.visible");
    cy.get(".line").eq(3).should("be.visible");
    cy.get(".line").eq(3).contains("You don't need 20 captains.");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(3).should("be.visible");
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
    cy.get(".line").eq(3).should("be.visible");
    cy.get(".line").eq(4).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(2).should("be.visible");
    cy.get(".line").eq(3).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(1).should("be.visible");
    cy.get(".line").eq(2).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(1).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(".line").eq(1).should("not.be.visible");

    cy.get("button:first").click()
    cy.get("a").eq(0).click();
    cy.url().should("eq", `http://localhost:3000/`);
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/1`);
    cy.get("button:first").click()
    cy.get("a").eq(1).click();
    cy.url().should("eq", `http://localhost:3000/stories`);
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/1`);
    cy.get("button:first").click()
    cy.get("a").eq(2).click();
    cy.url().should("eq", `http://localhost:3000/stories/${firstStory.slug.current}`);
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
    it("should autoplay as expected", () => {
    const firstStory: Story = stories.list[0];
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/1`);
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(`[data-testid="autoplay-btn"]`).trigger("click");
    cy.wait(4000);
    cy.get(".line").eq(1).should("be.visible");
    cy.get(`[data-testid="autoplay-btn"]`).trigger("click");
    cy.wait(4000);
    cy.get(".line").eq(2).should("not.be.visible");
    cy.reload();
    cy.wait(1000);
    cy.get(".line").eq(1).should("be.visible");
    cy.get(`[data-testid="autoplay-btn"]`).trigger("click");
    cy.wait(4000);
    cy.get(".line").eq(2).should("be.visible");
    cy.wait(4000);
    cy.get(".line").eq(3).should("be.visible");
    cy.wait(4000);
    cy.get(".line").eq(4).should("be.visible");
    cy.get(`[data-testid="autoplay-icon"]`).should("be.visible");
    cy.get(`[data-testid="autoplay-pause-icon"]`).should("not.exist");
  });
  it("should pause autoplay when other buttons are clicked", () => {
    const firstStory: Story = stories.list[0];
    cy.visit(`http://localhost:3000/stories/${firstStory.slug.current}/1`);
    cy.wait(1000);
    cy.get(".line").eq(0).should("be.visible");
    cy.get(`[data-testid="autoplay-btn"]`).trigger("click");
    cy.get(`[data-testid="autoplay-pause-icon"]`).should("be.visible");
    cy.wait(2000);
    cy.get(".line").eq(1).should("be.visible");
    cy.get(`[data-testid="next-line-btn"]`).trigger("click");
    cy.get(`[data-testid="autoplay-pause-icon"]`).should("not.exist");
    cy.get(`[data-testid="autoplay-btn"]`).trigger("click");
    cy.get(`[data-testid="autoplay-pause-icon"]`).should("be.visible");
    cy.get(`[data-testid="prev-line-btn"]`).trigger("click");
    cy.get(`[data-testid="autoplay-pause-icon"]`).should("not.exist");
  });
  it("should display not found", () => {
    cy.visit("http://localhost:3000/stories/story1/4", {
      failOnStatusCode: false,
    });
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("h1").contains("I haven't made the page you were looking for.");
  });
});
