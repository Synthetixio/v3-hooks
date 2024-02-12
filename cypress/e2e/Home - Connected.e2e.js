it('shows homepage to a connected wallet', () => {
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });

    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
    });
  });
  cy.viewport(1100, 900);
  cy.visit('/');
  cy.get('#app').should('contain', 'Synthetix V3 Hooks Playground');

  cy.get('@accountId').then((accountId) => {
    cy.get(`#app p`).should('contain', accountId);
  });
});
