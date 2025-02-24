import { routes } from "src/config/routes";

describe("Exercises", () => {
  // Navigate to main page and login
  beforeEach(() => {
    cy.visit(routes.login);
    cy.get('[data-testid="Email"]').type("test@example.com");
    cy.get('[data-testid="Password"]').type("password123");
    cy.get('[data-testid="login-btn"]').click();
    cy.url().should("include", routes.main);
  });

  it("Should display exercises", () => {
    cy.intercept(
      "GET",
      "https://bjldpefzbrrmjgljtmjf.supabase.co/rest/v1/exercises?select=*"
    ).as("fetchExercises");

    cy.get("[data-testid='loader']").should("be.visible");
    cy.wait("@fetchExercises");
    cy.get("[data-testid='loader']").should("not.exist");

    cy.get("[data-testid='exercise']").should("exist");
  });

  it("Should display exercise details", () => {
    cy.get("[data-testid='exercise']").first().click();
    cy.get("[data-testid='exercise-window']").should("exist");
    cy.get("[data-testid='exercise-window-title']").should("exist");
    cy.get("[data-testid='window-close-btn']").click();
  });

  it("Should filter exercises", () => {
    cy.get("[data-testid='search']").type("Deadlift");
    cy.get("[data-testid='bodyPart']").children().should("exist");
    cy.get("[data-testid='equipment']").children().should("exist");
    cy.get("[data-testid='target']").children().should("exist");

    cy.get("[data-testid='bodyPart']").select("back");
    cy.get("[data-testid='equipment']").select("roller");
    cy.get("[data-testid='target']").select("triceps");
  });
});
