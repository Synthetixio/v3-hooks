import { ethers } from 'ethers';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

function number(obj) {
  if (obj.eq(ethers.constants.MaxUint256)) {
    return 'MaxUint256';
  }
  if (obj.eq(ethers.constants.MaxInt256)) {
    return 'MaxInt256';
  }
  if (obj.abs().gt(1e10)) {
    // Assuming everything bigger than 1e10 is a wei
    return `wei ${parseFloat(ethers.utils.formatEther(`${obj}`))}`;
  }
  return parseFloat(obj.toString());
}

window.devtoolsFormatters = window.devtoolsFormatters ?? [];
window.devtoolsFormatters.push({
  header: function (obj) {
    if (obj instanceof ethers.BigNumber) {
      return [
        'div',
        { style: 'color: #f66' },
        ['span', {}, 'BigNumber('],
        ['span', { style: 'color: #3f3' }, number(obj)],
        ['span', {}, ')'],
      ];
    }
    return null;
  },
  hasBody: function () {
    return false;
  },
});

async function run() {
  if (window.ethereum) {
    await window.ethereum.enable();
  }
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(App));
}

run();
