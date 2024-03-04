import React from 'react';
import { useAccountOwner } from '../lib/useAccountOwner';
import { useCreateAccount } from '../lib/useCreateAccount';
import { Address } from './Address';

export function CreateAccount() {
  const [accountId, setAccountId] = React.useState('');

  const accountOwner = useAccountOwner({ accountId });
  const createAccount = useCreateAccount();

  const [allowError, setAllowError] = React.useState(false);

  return (
    <form
      data-testid="create account"
      action="#"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        createAccount.mutate({ accountId });
      }}
    >
      <p>
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
            onChange={(e) => setAllowError(e.target.checked)}
          />
          Allow errors
        </label>
      </p>
      {accountOwner.isLoading ? (
        <p className="loading">Loading account owner...</p>
      ) : accountOwner.isError ? (
        <p className="error">{accountOwner.error?.name ?? 'Error loading account owner'}</p>
      ) : accountOwner.data === '0x0000000000000000000000000000000000000000' ||
        accountOwner.data === undefined ? null : (
        <p className="error">
          Account already exists and owned by <Address address={accountOwner.data} />
        </p>
      )}
      {createAccount.isPending ? (
        <p className="loading">Creating account...</p>
      ) : createAccount.isError ? (
        <p className="error">{createAccount.error?.name ?? 'Error creating account'}</p>
      ) : null}
    </form>
  );
}
