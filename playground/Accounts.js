import * as React from 'react';
import { useAccounts } from '../lib/useAccounts';
import { useAccountOwner } from '../lib/useAccountOwner';
import { useSynthetix } from '../lib/useSynthetix';
import { Address } from './Address';
import { QueryResult } from './QueryResult';
import { CreateAccount } from './CreateAccount';

export function Account({ accountId }) {
  const accountOwner = useAccountOwner({ accountId });

  return (
    <p>
      {accountId}, owned by{' '}
      <QueryResult {...accountOwner}>
        {accountOwner.data ? <Address address={accountOwner.data} /> : null}
      </QueryResult>
    </p>
  );
}

export function Accounts() {
  const [synthetix] = useSynthetix();
  const accounts = useAccounts({
    walletAddress: synthetix.walletAddress,
  });

  return (
    <>
      <h2>Accounts</h2>
      <QueryResult {...accounts}>
        {accounts.data && accounts.data.length > 0
          ? accounts.data.map((accountId) => <Account key={accountId} accountId={accountId} />)
          : 'No accounts'}
      </QueryResult>
      <CreateAccount />
    </>
  );
}
