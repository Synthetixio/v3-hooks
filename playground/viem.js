import { formatEther } from 'viem';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  custom,
  serializeTransaction,
  parseAbi,
  getAbiItem,
  encodeFunctionData,
  createPublicClient,
  createWalletClient,
} from 'viem';
import { SynthetixProvider } from '../lib/useSynthetix';
import { App } from './App';
import './devtools';

import { createReader } from '../lib/adapters/viem';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

async function run() {
  const root = ReactDOM.createRoot(container);

  const chainId = window.ethereum ? Number(window.ethereum.chainId) : undefined;
  const preset = 'andromeda';

  const publicClient = window.ethereum
    ? createPublicClient({ transport: custom(window.ethereum) })
    : undefined;

  const signer = window.ethereum
    ? createWalletClient({ transport: custom(window.ethereum) })
    : undefined;

  let [walletAddress] = signer ? await signer.getAddresses() : undefined;

  // Autoconnect here until we have button in the UI
  if (!walletAddress) {
    [walletAddress] = signer ? await signer.requestAddresses() : undefined;
  }

  root.render(
    React.createElement(
      SynthetixProvider,
      {
        chainId,
        preset,
        reader: createReader({ publicClient }),
        walletAddress: walletAddress ? walletAddress.toLowerCase() : undefined,
      },
      React.createElement(App)
    )
  );
}

run();
