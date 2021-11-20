it('renders', () => {
  cy.visit('/');
  cy.get('[data-testid=app]').should('be.visible');
});

it('shows notes on startup', () => {
  cy.visit('/');
  cy.get('[placeholder=title]').should('be.visible');
  cy.get('[placeholder=content]').should('be.visible');
});
