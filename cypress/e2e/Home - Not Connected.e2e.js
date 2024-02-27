it('shows homepage to not connected wallet', () => {
  cy.viewport(1100, 900);
  cy.visit('/');
  cy.get('#app').should('contain', 'Synthetix V3 Hooks Playground');

  cy.get('[data-testid="wallet section"]').should('exist');
  cy.contains('[data-testid="wallet section"] button', 'Connect').should('exist');

  cy.get('[data-testid="accounts section"]').should('not.exist');
});
