import { ethers } from 'ethers';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { SynthetixProvider } from '../lib/useSynthetix';
import { App } from './App';
import './devtools';

import { createReader } from '../lib/adapters/ethers';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

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

  root.render(
    React.createElement(
      SynthetixProvider,
      {
        chainId,
        preset,
        reader: createReader({ provider }),
        walletAddress: walletAddress ? walletAddress.toLowerCase() : undefined,
      },
      React.createElement(App)
    )
  );
}

run();
