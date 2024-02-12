import * as React from 'react';
import { useAccounts } from '../lib/useAccounts';
import { useBlockchain } from '../lib/useBlockchain';

export function AccountsUI({ isLoading, data, isError, error }) {
  return React.createElement(
    'div',
    {},
    isLoading
      ? 'loading...'
      : isError
        ? `Error: ${error}`
        : data && data.length > 0
          ? data.map((account) => React.createElement('p', { key: account }, account))
          : `No accounts found for ${blockchain.walletAddress}`
  );
}

export function Accounts() {
  const blockchain = useBlockchain();
  const { isLoading, data, isError, error } = useAccounts({
    walletAddress: blockchain.walletAddress,
  });
  return React.createElement(AccountsUI, { isLoading, data, isError, error });
}
