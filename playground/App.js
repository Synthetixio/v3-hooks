import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { useIsChainSupported } from '../lib/useIsChainSupported';
import { useSynthetix } from '../lib/useSynthetix';
import { Accounts } from './Accounts';
import { Wallet } from './Wallet';

export function App() {
  const [synthetix] = useSynthetix();

  const isChainSupported = useIsChainSupported();

  return (
    <>
      <h1>Synthetix V3 Hooks Playground</h1>
      <section>
        <Wallet />
      </section>

      {isChainSupported && synthetix.walletAddress ? (
        <>
          <section>
            <Accounts />
          </section>
        </>
      ) : null}

      <ReactQueryDevtools client={synthetix.queryClient} />
    </>
  );
}
