import * as React from 'react';
const { useSynthetix } = require('../lib/useSynthetix');

export function useWalletWatcher() {
  const [synthetix, updateSynthetix] = useSynthetix();

  React.useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    function onAccountsChanged(accounts) {
      updateSynthetix({
        walletAddress: accounts[0] ? accounts[0].toLowerCase() : undefined,
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

  return null;
}
