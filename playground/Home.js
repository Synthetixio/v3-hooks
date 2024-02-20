import * as React from 'react';
import { useSynthetix } from '../lib/useSynthetix';
import { Accounts } from './Accounts';

export function Home() {
  const [synthetix, updateSynthetix] = useSynthetix();

  React.useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    function onAccountsChanged(accounts) {
      updateSynthetix({
        walletAddress: window.ethereum.selectedAddress
          ? `${window.ethereum.selectedAddress}`.toLowerCase()
          : undefined,
      });
    }

    function onChainChanged(chainId) {
      updateSynthetix({ chainId: Number(chainId) });
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
    synthetix.walletAddress ? React.createElement(Accounts) : null
  );
}
