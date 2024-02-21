import { mount } from 'cypress/react18';
import * as React from 'react';

function Container(props) {
  return <div id="app" {...props} />;
}

Cypress.Commands.add('mount', (el) => mount(<Container>{el}</Container>));
