import * as React from 'react';
import { useConfig } from '../lib/useConfig';
import { Accounts } from './Accounts';

export function Home() {
  const [config, updateConfig] = useConfig();

  React.useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    function onAccountsChanged(accounts) {
      updateConfig({
        isConnected: window.ethereum.isConnected(),
        walletAddress: window.ethereum.selectedAddress,
      });
    }

    function onChainChanged(chainId) {
      updateConfig({ chainId: Number(chainId) });
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
    config.walletAddress ? React.createElement(Accounts) : null
  );
}
