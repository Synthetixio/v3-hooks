import * as React from 'react';
import { useAccounts } from '../lib/useAccounts';
import { useSynthetix } from '../lib/useSynthetix';

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
  const [synthetix] = useSynthetix();
  const { isLoading, data, isError, error } = useAccounts({
    walletAddress: synthetix.walletAddress,
  });
  return React.createElement(AccountsUI, { isLoading, data, isError, error });
}
