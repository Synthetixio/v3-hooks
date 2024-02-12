import * as React from 'react';
import { useBlockchain, useUpdateBlockchain } from '../lib/useBlockchain';
import { Accounts } from './Accounts';

export function Home() {
  const updateBlockchain = useUpdateBlockchain();
  const blockchain = useBlockchain();

  React.useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    function onAccountsChanged(accounts) {
      updateBlockchain({
        isConnected: window.ethereum.isConnected(),
        walletAddress: window.ethereum.selectedAddress,
      });
    }

    function onChainChanged(chainId) {
      updateBlockchain({ chainId: Number(chainId) });
    }

    window.ethereum.on('accountsChanged', onAccountsChanged);
    window.ethereum.on('chainChanged', onChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum.removeListener('chainChanged', onChainChanged);
    };
  }, []);

  return React.createElement(
    React.Fragment,
    {},
    React.createElement('h1', {}, 'Synthetix V3 Hooks Playground'),
    blockchain.walletAddress ? React.createElement(Accounts) : null
  );
}
