import * as React from 'react';
import { useAccounts } from '../lib/useAccounts';
import { useAccountOwner } from '../lib/useAccountOwner';
import { useSynthetix } from '../lib/useSynthetix';

function QueryStatus({ isError, error, isLoading }) {
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

  return null;
}

export function Account({ accountId }) {
  const accountOwner = useAccountOwner({ accountId });

  return React.createElement(
    'p',
    {},
    `# ${accountId}, owned by `,
    ' ',
    React.createElement(QueryStatus, accountOwner),
    accountOwner.data ? accountOwner.data : null
  );
}

export function CreateAccount() {
  const [accountId, setAccountId] = React.useState('');

  const accountOwner = useAccountOwner({ accountId });

  return React.createElement(
    'form',
    {
      method: 'POST',
      action: '#',
      onSubmit: (e) => {
        e.preventDefault();
        console.log(`accountId`, accountId);
      },
    },

    React.createElement('input', {
      type: 'number',
      name: 'accountId',
      placeholder: 'Account ID',
      value: accountId,
      onChange: (e) => setAccountId(e.target.value),
    }),
    ' ',
    React.createElement(
      'button',
      {
        type: 'submit',
        disabled:
          accountOwner.isLoading ||
          accountOwner.data !== '0x0000000000000000000000000000000000000000',
      },
      'Create'
    ),
    React.createElement('br'),
    React.createElement(
      QueryStatus,
      accountOwner,
      accountOwner.data === '0x0000000000000000000000000000000000000000' ||
        accountOwner.data === undefined
        ? null
        : `Account already exists and owned by ${accountOwner.data}`
    )
  );
}

export function Accounts() {
  const [synthetix] = useSynthetix();
  const accounts = useAccounts({
    walletAddress: synthetix.walletAddress,
  });

  return React.createElement(
    React.Fragment,
    {},

    React.createElement('h2', {}, 'Accounts'),
    React.createElement(QueryStatus, accounts),

    accounts.data && accounts.data.length > 0
      ? React.createElement(
          React.Fragment,
          {},
          accounts.data.map((accountId) =>
            React.createElement(Account, { key: accountId, accountId })
          )
        )
      : React.createElement(React.Fragment, {}, 'No accounts'),
    React.createElement(CreateAccount)
  );
}
