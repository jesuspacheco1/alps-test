Cypress.Commands.add("uiLogin", ({ username, password }) => {
  if (!!username) cy.get('[name="username"]').type(username);
  if (!!password) cy.get('[name="password"]').type(password);
  cy.get('[type="submit"]').click();
});

Cypress.Commands.add("toast", (message) => {
  cy.get(".Toastify").contains(message);
});
