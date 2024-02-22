import * as React from 'react';
import { useAccountOwner } from '../lib/useAccountOwner';
import { useCreateAccount } from '../lib/useCreateAccount';
import { QueryResult } from './QueryResult';
import { Address } from './Address';

export function CreateAccount() {
  const [accountId, setAccountId] = React.useState('');

  const accountOwner = useAccountOwner({ accountId });
  const createAccount = useCreateAccount({ accountId });

  return (
    <form
      action="#"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(`accountId`, accountId);
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
        //        disabled={
        //          (accountId && accountOwner.isLoading) ||
        //          (accountId && accountOwner.data !== '0x0000000000000000000000000000000000000000')
        //        }
      >
        {accountId ? `Create account "${accountId}"` : 'Create random account'}
      </button>
      <br />
      <QueryResult {...accountOwner}>
        {accountOwner.data === '0x0000000000000000000000000000000000000000' ||
        accountOwner.data === undefined ? null : (
          <>
            Account already exists and owned by <Address address={accountOwner.data} />
          </>
        )}
      </QueryResult>
    </form>
  );
}
