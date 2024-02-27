it('creates new account with pre-defined id', () => {
  cy.connectWallet().then(({ address }) => {
    cy.task('setEthBalance', { address, balance: 100 });
  });
  cy.viewport(1100, 900);
  cy.visit('/');

  const accountId = parseInt(`1337${Math.floor(Math.random() * 1_000_000)}`);
  cy.wrap(accountId).as('accountId');

  cy.get('[data-testid="create account"] input[name="accountId"]').type(`${accountId}`);
  cy.get('[data-testid="create account"] button')
    .should('contain', `Create account "${accountId}"`)
    .click();

  cy.get('[data-testid="accounts list"] [data-testid="account"]').should('have.length', 1);
  cy.get(
    `[data-testid="accounts list"] [data-testid="account"][data-accountId="${accountId}"]`
  ).should('exist');

  cy.get('@wallet').then(({ address }) => {
    cy.contains(
      `[data-testid="accounts list"] [data-testid="account"][data-accountId="${accountId}"]`,
      `owned by ${address.substring(0, 6).toLowerCase()}`
    ).should('exist');
  });
});
