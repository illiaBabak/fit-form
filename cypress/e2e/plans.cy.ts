import { routes } from "src/config/routes";

describe("Plans", () => {
  // Navigate to plan page and login
  beforeEach(() => {
    cy.visit(routes.login);
    cy.get('[data-testid="Email"]').type("test@example.com");
    cy.get('[data-testid="Password"]').type("password123");
    cy.get('[data-testid="login-btn"]').click();
    cy.url().should("include", routes.main);
    cy.visit(routes.myPlan);
  });

  it("Should create plan", () => {
    cy.get("[data-testid='create-plan-btn']").click();
    cy.get("[data-testid='plan-window']").should("exist");

    cy.get("[data-testid='plan-name']").type("Name");

    cy.get("[data-testid='monday-section']").should("exist");
    cy.get("[data-testid='add-exercise-btn']").first().click();
    cy.get("[data-testid='exercises-window']").should("exist");
    cy.get("[data-testid='exercise']").first().click();

    cy.get("[data-testid='save-plan-btn']").click();
  });

  it("Should edit plan", () => {
    cy.get("[data-testid='plan']").first().click();
    cy.get("[data-testid='plan-name']").type("Edited name");

    cy.get("[data-testid='plan-exercise']").trigger("dragstart");
    cy.get("[data-testid='tuesday-section']").trigger("drop");

    cy.get("[data-testid='save-plan-btn']").click();
  });

  it("Should delete plan", () => {
    cy.get("[data-testid='delete-plan-btn']").first().click();
  });
});
