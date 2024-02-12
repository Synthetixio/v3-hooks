import { mount } from 'cypress/react18';
import * as React from 'react';

function Container(props) {
  return React.createElement('div', { id: 'app', ...props });
}

Cypress.Commands.add('mount', (el) => mount(React.createElement(Container, {}, el)));
