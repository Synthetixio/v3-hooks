it('shows homepage to a connected wallet', () => {
  cy.connectWallet();
  cy.viewport(1100, 900);
  cy.visit('/');
  cy.get('#app').should('contain', 'Synthetix V3 Hooks Playground');

  cy.get('[data-testid="wallet section"]').should('exist');

  cy.get('@wallet').then(({ address }) => {
    cy.get('[data-testid="wallet section"]').should(
      'contain',
      `Connected as ${address.substring(0, 6).toLowerCase()}`
    );
    cy.get(`[data-testid="wallet section"] code[title="${address.toLowerCase()}"]`).should('exist');
  });

  cy.get('[data-testid="accounts section"]').should('exist');
});
