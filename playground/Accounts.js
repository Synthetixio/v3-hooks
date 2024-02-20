import * as React from 'react';
import { useAccounts } from '../lib/useAccounts';
import { useConfig } from '../lib/useConfig';

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
          : `No accounts`
  );
}

export function Accounts() {
  const [config] = useConfig();
  const { isLoading, data, isError, error } = useAccounts({
    walletAddress: config.walletAddress,
  });
  return React.createElement(AccountsUI, { isLoading, data, isError, error });
}
