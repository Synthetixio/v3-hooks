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

  return React.createElement(
    React.Fragment,
    {},
    React.createElement(ReactQueryDevtools, { client: synthetix.queryClient }),
    React.createElement('h1', {}, 'Synthetix V3 Hooks Playground'),
    React.createElement(Wallet),

    isChainSupported && synthetix.walletAddress
      ? React.createElement(
          React.Fragment,
          {},
          React.createElement('section', {}, React.createElement(Accounts))
        )
      : null
  );
}
