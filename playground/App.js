import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const { useSynthetix } = require('../lib/useSynthetix');
const { useIsChainSupported } = require('../lib/useIsChainSupported');

const { useWalletWatcher } = require('./useWalletWatcher');
import { Wallet } from './Wallet';
import { Accounts } from './Accounts';

export function App() {
  useWalletWatcher();
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
