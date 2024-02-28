import { useAccountOwner } from '../lib/useAccountOwner';
import { useAccounts } from '../lib/useAccounts';
import { useSynthetix } from '../lib/useSynthetix';
import { Address } from './Address';
import { CreateAccount } from './CreateAccount';
import { QueryResult } from './QueryResult';

export function Account({ accountId }) {
  const accountOwner = useAccountOwner({ accountId });

  return (
    <p data-testid="account" data-account-id={accountId}>
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
      <div data-testid="accounts list">
        <QueryResult {...accounts}>
          {accounts.data && accounts.data.length > 0
            ? accounts.data.map((accountId) => <Account key={accountId} accountId={accountId} />)
            : 'No accounts'}
        </QueryResult>
      </div>
      <CreateAccount />
    </>
  );
}
