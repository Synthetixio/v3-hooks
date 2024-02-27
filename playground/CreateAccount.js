import * as React from 'react';
import { useAccountOwner } from '../lib/useAccountOwner';
import { useCreateAccount } from '../lib/useCreateAccount';
import { Address } from './Address';
import { QueryResult } from './QueryResult';
import { MutationResult } from './MutationResult';

export function CreateAccount() {
  const [accountId, setAccountId] = React.useState('');

  const accountOwner = useAccountOwner({ accountId });
  const createAccount = useCreateAccount();

  const [allowError, setAllowErrror] = React.useState(false);

  return (
    <form
      action="#"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        createAccount.mutate({ accountId });
      }}
    >
      <input
        type="number"
        name="accountId"
        placeholder="Account ID"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
      />{' '}
      <button
        type="submit"
        disabled={
          accountOwner.isLoading ||
          createAccount.isPending ||
          (!allowError &&
            accountId &&
            accountOwner.data !== '0x0000000000000000000000000000000000000000')
        }
      >
        {accountId ? `Create account "${accountId}"` : 'Create random account'}
      </button>
      <label htmlFor="allowErrors">
        <input
          id="allowErrors"
          type="checkbox"
          checked={allowError}
          onChange={(e) => setAllowErrror(e.target.checked)}
        />
        Allow errors
      </label>
      <QueryResult {...accountOwner}>
        {accountOwner.data === '0x0000000000000000000000000000000000000000' ||
        accountOwner.data === undefined ? null : (
          <div style={{ color: '#f00' }}>
            Account already exists and owned by <Address address={accountOwner.data} />
          </div>
        )}
      </QueryResult>
      <MutationResult {...createAccount} />
    </form>
  );
}
