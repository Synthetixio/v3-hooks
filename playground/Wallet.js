import * as React from 'react';
const { useSynthetix } = require('../lib/useSynthetix');
const { useIsChainSupported } = require('../lib/useIsChainSupported');

const { Address } = require('./Address');

function Connected() {
  const [synthetix] = useSynthetix();
  const isChainSupported = useIsChainSupported();

  return (
    <>
      {!isChainSupported ? (
        <>
          <b style={{ color: 'red' }}>
            Chain "{synthetix.chainId}" is not supported, switch in your wallet
          </b>
          <br />
        </>
      ) : null}
      Connected as <Address address={synthetix.walletAddress} />
    </>
  );
}

export function Wallet() {
  const [synthetix] = useSynthetix();

  return (
    <>
      <h2>Wallet</h2>
      {synthetix.walletAddress ? (
        <Connected />
      ) : (
        <button onClick={window.__connect}>Connect</button>
      )}
    </>
  );
}
