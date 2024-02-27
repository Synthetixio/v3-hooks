it('creates new account with random id', () => {
  cy.connectWallet().then(({ address }) => {
    cy.task('setEthBalance', { address, balance: 100 });
  });
  cy.viewport(1100, 900);
  cy.visit('/');

  cy.get('[data-testid="create account"] button')
    .should('contain', 'Create random account')
    .click();

  cy.get('[data-testid="accounts list"] [data-testid="account"]').should('have.length', 1);

  cy.get('@wallet').then(({ address }) => {
    cy.contains(
      '[data-testid="accounts list"] [data-testid="account"]',
      `owned by ${address.substring(0, 6).toLowerCase()}`
    ).should('exist');
  });
});
