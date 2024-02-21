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

  const accounts = signer ? await signer.getAddresses() : [];
  const walletAddress = accounts[0] ? accounts[0].toLowerCase() : undefined;
  const reader = createReader({ publicClient });

  window.__connect = async () => {
    return signer ? await signer.requestAddresses() : undefined;
  };

  root.render(
    <SynthetixProvider {...{ chainId, preset, reader, walletAddress }}>
      <App />
    </SynthetixProvider>
  );
}

run();
