import React from 'react';
import ReactDOM from 'react-dom/client';
import { createPublicClient, createWalletClient, custom } from 'viem';
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
import { SynthetixProvider, useSynthetix } from '../lib/useSynthetix';
import { App } from './App';
import './devtools';

const chains = [base, baseGoerli, baseSepolia, goerli, mainnet, optimism, optimismGoerli, sepolia];

export function WalletWatcher({ children }) {
  const [, updateSynthetix] = useSynthetix();

  React.useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    function onAccountsChanged(accounts) {
      updateSynthetix({ walletAddress: accounts[0] ? accounts[0].toLowerCase() : undefined });
    }

    async function onChainChanged(chainIdRaw) {
      const chainId = Number(chainIdRaw);
      const chain = chains.find(({ id }) => String(id) === String(chainId));
      const publicClient = createPublicClient({ chain, transport: custom(window.ethereum) });
      const walletClient = createWalletClient({ chain, transport: custom(window.ethereum) });
      const reader = createReader({ publicClient });
      const writer = createWriter({ publicClient, walletClient });
      updateSynthetix({ chainId, reader, writer });
    }

    window.ethereum.on('accountsChanged', onAccountsChanged);
    window.ethereum.on('chainChanged', onChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum.removeListener('chainChanged', onChainChanged);
    };
  }, [updateSynthetix]);

  return children;
}

async function run() {
  const preset = 'andromeda';

  const publicClient = window.ethereum
    ? createPublicClient({ transport: custom(window.ethereum) })
    : undefined;

  const chainId = publicClient ? await publicClient.getChainId() : 0;
  const chain = chains.find(({ id }) => String(id) === String(chainId));

  const publicClientWithChain = window.ethereum
    ? createPublicClient({ chain, transport: custom(window.ethereum) })
    : undefined;

  const walletClient = window.ethereum
    ? createWalletClient({ chain, transport: custom(window.ethereum) })
    : undefined;

  const accounts = walletClient ? await walletClient.getAddresses() : [];
  const walletAddress = accounts[0] ? accounts[0].toLowerCase() : undefined;
  const reader = createReader({ publicClient: publicClientWithChain });
  const writer = createWriter({ publicClient: publicClientWithChain, walletClient });

  window.__connect = async () => {
    return walletClient ? await walletClient.requestAddresses() : undefined;
  };

  const root = ReactDOM.createRoot(document.querySelector('#app'));
  root.render(
    <SynthetixProvider
      {...{
        chainId,
        preset,
        reader,
        writer,
        walletAddress,
      }}
    >
      <WalletWatcher>
        <App />
      </WalletWatcher>
    </SynthetixProvider>
  );
}

run();

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    // do nothing
  });
}
