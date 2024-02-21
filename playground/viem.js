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
  window.__VIEM__ = true;
  const root = ReactDOM.createRoot(container);

  const preset = 'andromeda';

  const publicClient = window.ethereum
    ? createPublicClient({ transport: custom(window.ethereum) })
    : undefined;

  const chainId = publicClient ? await publicClient.getChainId() : 0;

  const signer = window.ethereum
    ? createWalletClient({ transport: custom(window.ethereum) })
    : undefined;

  const [walletAddress] = signer ? await signer.getAddresses() : [];

  window.__connect = async () => {
    return signer ? await signer.requestAddresses() : undefined;
  };

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
