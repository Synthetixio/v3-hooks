import { ethers } from 'ethers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createReader, createWriter } from '../lib/adapters/ethers';
import { SynthetixProvider, useSynthetix } from '../lib/useSynthetix';
import { App } from './App';
import './devtools';

export function WalletWatcher({ children }) {
  const [, updateSynthetix] = useSynthetix();

  React.useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    function onAccountsChanged(accounts) {
      updateSynthetix({ walletAddress: accounts[0] ? accounts[0].toLowerCase() : undefined });
    }

    async function onChainChanged(chainId) {
      updateSynthetix({ chainId: Number(chainId) });
    }

    window.ethereum.on('accountsChanged', onAccountsChanged);
    window.ethereum.on('chainChanged', onChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum.removeListener('chainChanged', onChainChanged);
    };
  }, []);

  return children;
}

async function run() {
  const preset = 'andromeda';

  const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : undefined;
  const { chainId } = provider ? await provider.getNetwork() : 0;

  const signer = provider ? provider.getSigner() : undefined;

  const accounts = provider ? await provider.listAccounts() : [];
  const walletAddress = accounts[0] ? accounts[0].toLowerCase() : undefined;
  const reader = createReader({ provider });
  const writer = createWriter({ signer });

  window.__connect = async () => {
    return provider ? await provider.send('eth_requestAccounts') : undefined;
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
