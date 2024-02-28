import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
      <section data-testid="wallet section">
        <Wallet />
      </section>

      {isChainSupported && synthetix.walletAddress ? (
        <>
          <section data-testid="accounts section">
            <Accounts />
          </section>
        </>
      ) : null}

      {process.env.NODE_ENV === 'test' ? null : (
        <ReactQueryDevtools client={synthetix.queryClient} />
      )}
    </>
  );
}
