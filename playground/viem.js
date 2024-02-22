import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createPublicClient, createWalletClient, custom, extractChain } from 'viem';
import {
  base,
  baseGoerli,
  baseSepolia,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  sepolia,
} from 'viem/chains';

import { createReader, createWriter } from '../lib/adapters/viem';
import { SynthetixProvider } from '../lib/useSynthetix';
import { App } from './App';
import './devtools';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

const chains = [base, baseGoerli, baseSepolia, goerli, mainnet, optimism, optimismGoerli, sepolia];

async function run() {
  window.__VIEM__ = true;
  const root = ReactDOM.createRoot(container);

  const preset = 'andromeda';

  const publicClient = window.ethereum
    ? createPublicClient({ transport: custom(window.ethereum) })
    : undefined;

  const chainId = publicClient ? await publicClient.getChainId() : 0;

  //  const chain = extractChain({ chains, id: chainId });

  const walletClient = window.ethereum
    ? createWalletClient({ transport: custom(window.ethereum) })
    : undefined;

  const accounts = walletClient ? await walletClient.getAddresses() : [];
  const walletAddress = accounts[0] ? accounts[0].toLowerCase() : undefined;
  const reader = createReader({ publicClient });
  const writer = createWriter({ publicClient, walletClient });

  window.__connect = async () => {
    return walletClient ? await walletClient.requestAddresses() : undefined;
  };

  root.render(
    <SynthetixProvider {...{ chainId, preset, reader, writer, walletAddress }}>
      <App />
    </SynthetixProvider>
  );
}

run();
