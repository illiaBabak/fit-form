import { routes } from "src/config/routes";

describe("Navigation", () => {
  it("Should navigate to the login page", () => {
    cy.visit("/");
    cy.get('[data-testid="start-btn"]').click();
    cy.url().should("include", routes.login);
  });

  it("Should sign up", () => {
    cy.visit(routes.signUp);
    cy.get('[data-testid="Email"]').type("test@example.com");
    cy.get('[data-testid="Password"]').type("password123");
    cy.get('[data-testid="Confirm password"]').type("password123");
    cy.get('[data-testid="sign-up-btn"]').click();
    cy.get('[data-testid="custom-alert"]').should("exist");
    cy.get('[data-testid="custom-alert"]').should("be.visible");
    cy.get('[data-testid="custom-alert"]')
      .should("not.have.text", "Check your email to confirm sign up!")
      .and("not.have.text", "*User already exists!");
  });

  it("Should navigate to main page after login", () => {
    cy.visit(routes.login);
    cy.get('[data-testid="Email"]').type("test@example.com");
    cy.get('[data-testid="Password"]').type("password123");
    cy.get('[data-testid="login-btn"]').click();
    cy.url().should("include", routes.main);
  });

  it("Should navigate to page with plans and logout", () => {
    cy.visit(routes.myPlan);
    cy.get('[data-testid="user-btn"]').click();
    cy.get('[data-testid="logout-btn"]').click();
    cy.url().should("include", routes.start);
  });

  it("Should handle unexpected url", () => {
    cy.visit("*");
    cy.url().should("include", routes.redirect);
    cy.get('[data-testid="redirect-btn"]').click();
    cy.url().should("include", routes.start);
  });
});
