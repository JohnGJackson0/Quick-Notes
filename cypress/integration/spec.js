describe('app', () => {
  it('renders', () => {
    cy.visit('/');
    cy.findByTestId('app').should('be.visible');
  });

  it('shows notes on startup', () => {
    cy.visit('/');
    cy.findByPlaceholderText('title').should('be.visible');
    cy.findByPlaceholderText('content').should('be.visible');
  });
});
