import * as React from 'react';
import { useAccounts } from '../lib/useAccounts';
import { useAccountOwner } from '../lib/useAccountOwner';
import { useSynthetix } from '../lib/useSynthetix';

function QueryResult({ isError, error, isLoading, children }) {
  if (isLoading) {
    return React.createElement(React.Fragment, {}, 'Loading...');
  }

  if (isError) {
    return React.createElement(
      React.Fragment,
      {},
      error ? React.createElement('pre', {}, error.stack) : 'Error'
    );
  }

  return React.createElement(React.Fragment, {}, children);
}

export function Account({ accountId }) {
  const accountOwner = useAccountOwner({
    accountId,
  });

  return React.createElement(
    'p',
    {},
    'Account ID:',
    ' ',
    accountId,
    ' ',
    'Owner:',
    ' ',
    React.createElement(QueryResult, accountOwner, accountOwner.data)
  );
}

export function Accounts() {
  const [synthetix] = useSynthetix();
  const accounts = useAccounts({
    walletAddress: synthetix.walletAddress,
  });

  return React.createElement(
    QueryResult,
    accounts,
    accounts.data && accounts.data.length > 0
      ? React.createElement(
          React.Fragment,
          {},
          accounts.data.map((accountId) =>
            React.createElement(Account, { key: accountId, accountId })
          )
        )
      : React.createElement(React.Fragment, {}, 'No accounts')
  );
}
