import * as React from 'react';
import { useAccountOwner } from '../lib/useAccountOwner';
import { QueryResult } from './QueryResult';
import { Address } from './Address';

export function CreateAccount() {
  const [accountId, setAccountId] = React.useState('');

  const accountOwner = useAccountOwner({ accountId });

  return (
    <form
      action="#"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(`accountId`, accountId);
      }}
    >
      <input
        type="number"
        name="accountId"
        placeholder="Account ID"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
      />

      <button
        type="submit"
        disabled={
          accountOwner.isLoading ||
          accountOwner.data !== '0x0000000000000000000000000000000000000000'
        }
      >
        Create
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
