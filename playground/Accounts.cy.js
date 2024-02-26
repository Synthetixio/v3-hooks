import * as React from 'react';

describe('Accounts', () => {
  it('should be OK', () => {
    function Accounts() {
      return <div>OK</div>;
    }

    cy.viewport(800, 500);
    cy.mount(
      <Accounts
        {...{
          isLoading: true,
          data: undefined,
          isError: false,
          error: undefined,
        }}
      />
    );

    cy.contains(`#app`, 'OK');
  });
});
