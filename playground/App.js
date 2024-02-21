import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const { useSynthetix } = require('../lib/useSynthetix');

const { useWalletWatcher } = require('./useWalletWatcher');
import { Accounts } from './Accounts';

export function App() {
  useWalletWatcher();
  const [synthetix, updateSynthetix] = useSynthetix();

  return React.createElement(
    React.Fragment,
    {},
    React.createElement(ReactQueryDevtools, { client: synthetix.queryClient }),
    React.createElement('h1', {}, 'Synthetix V3 Hooks Playground'),
    synthetix.walletAddress ? React.createElement(Accounts) : null
  );
}
