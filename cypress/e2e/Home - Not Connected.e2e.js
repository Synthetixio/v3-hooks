it('shows homepage to not connected wallet', () => {
  cy.viewport(1100, 900);
  cy.visit('/');
  cy.get('#app').should('contain', 'Synthetix V3 Hooks Playground');
  cy.contains('#app button', 'Connect');
});
