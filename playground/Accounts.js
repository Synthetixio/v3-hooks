import { useAccountOwner } from '../lib/useAccountOwner';
import { useAccounts } from '../lib/useAccounts';
import { useSynthetix } from '../lib/useSynthetix';
import { Address } from './Address';
import { CreateAccount } from './CreateAccount';

export function Account({ accountId }) {
  const accountOwner = useAccountOwner({ accountId });

  return (
    <p data-testid="account" data-account-id={accountId}>
      {accountId}
      {accountOwner.isLoading ? (
        <span className="loading">...</span>
      ) : accountOwner.isError ? (
        <span className="error">{accountOwner.error?.name ?? 'Error'}</span>
      ) : accountOwner.data ? (
        <>
          , owned by <Address address={accountOwner.data} />
        </>
      ) : null}
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
        {accounts.isLoading ? (
          <p className="loading">Loading accounts...</p>
        ) : accounts.isError ? (
          <p className="error">{accounts.error?.name ?? 'Error loading accounts'}</p>
        ) : accounts.data && accounts.data.length > 0 ? (
          accounts.data.map((accountId) => <Account key={accountId} accountId={accountId} />)
        ) : (
          <p>No accounts</p>
        )}
      </div>
      <CreateAccount />
    </>
  );
}
