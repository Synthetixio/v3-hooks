import { mount } from 'cypress/react18';
import * as React from 'react';

describe('Accounts', () => {
  it('should be OK', () => {
    function Accounts() {
      React.createElement('div', {}, 'OK');
    }
    cy.contains(`#app`, 'OK');
  });
});
