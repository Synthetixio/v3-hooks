it('shows no accounts for a new wallet', () => {
  cy.connectWallet();
  cy.viewport(1100, 900);
  cy.visit('/');
  cy.contains('[data-testid="accounts"]', 'No accounts').should('exist');
});
