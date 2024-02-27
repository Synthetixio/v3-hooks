it('shows list of owned accounts', () => {
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
    });
  });
  cy.viewport(1100, 900);
  cy.visit('/');

  cy.get('@accountId').then((accountId) => {
    cy.contains('[data-testid="account"]', `${accountId}`).should('exist');
  });
});
