import { ethers } from 'ethers';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { SynthetixProvider } from '../lib/SynthetixProvider';
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
  const root = ReactDOM.createRoot(container);

  const chainId = window.ethereum ? Number(window.ethereum.chainId) : undefined;
  const preset = 'andromeda';

  const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : undefined;
  const signer = provider ? provider.getSigner() : undefined;

  let walletAddress = window.ethereum ? window.ethereum.selectedAddress : undefined;

  // Autoconnect here until we have button in the UI
  if (provider && !walletAddress) {
    [walletAddress] = await provider.send('eth_requestAccounts');
  }

  const isConnected = Boolean(walletAddress);

  root.render(
    React.createElement(
      SynthetixProvider,
      {
        isEthers: true,
        chainId,
        preset,
        signer,
        provider,
        isConnected,
        walletAddress,
      },
      React.createElement(App)
    )
  );
}

run();
