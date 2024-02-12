import { mount } from 'cypress/react18';
import * as React from 'react';
import { AccountsUI } from './Accounts';

describe('Accounts', () => {
  it('should show loading state', () => {
    cy.viewport(800, 500);
    cy.mount(
      React.createElement(AccountsUI, {
        isLoading: true,
        data: undefined,
        isError: false,
        error: undefined,
      })
    );
    cy.get(`#app`).should('contain', 'loading...');
  });

  it('should return list of account IDs for a given wallet', () => {
    cy.viewport(800, 500);
    cy.mount(
      React.createElement(AccountsUI, {
        isLoading: false,
        data: [1, 2, 3],
        isError: false,
        error: undefined,
      })
    );
    cy.contains(`#app p`, 1);
    cy.contains(`#app p`, 2);
    cy.contains(`#app p`, 3);
  });

  it('should show "No accounts" message for an empty wallet', () => {
    cy.viewport(800, 500);
    cy.mount(
      React.createElement(AccountsUI, {
        isLoading: false,
        data: [],
        isError: false,
        error: undefined,
      })
    );
    cy.contains(`#app`, 'No accounts');
  });
});
