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

  const preset = 'andromeda';

  const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : undefined;
  const { chainId } = provider ? await provider.getNetwork() : 0;

  const accounts = provider ? await provider.listAccounts() : [];
  const walletAddress = accounts[0] ? accounts[0].toLowerCase() : undefined;
  const reader = createReader({ provider });

  window.__connect = async () => {
    return provider ? await provider.send('eth_requestAccounts') : undefined;
  };

  root.render(
    <SynthetixProvider {...{ chainId, preset, reader, walletAddress }}>
      <App />
    </SynthetixProvider>
  );
}

run();
