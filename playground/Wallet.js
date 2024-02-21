import * as React from 'react';
const { useSynthetix } = require('../lib/useSynthetix');
const { useIsChainSupported } = require('../lib/useIsChainSupported');

const { Address } = require('./Address');

function Connected() {
  const [synthetix] = useSynthetix();
  const isChainSupported = useIsChainSupported();

  return React.createElement(
    React.Fragment,
    {},
    isChainSupported
      ? null
      : React.createElement(
          React.Fragment,
          {},
          React.createElement(
            'b',
            { style: { color: 'red' } },
            ` Chain "${synthetix.chainId}" is not supported, switch in your wallet`
          ),
          React.createElement('br')
        ),
    'Connected as ',
    React.createElement(Address, { address: synthetix.walletAddress })
  );
}

export function Wallet() {
  const [synthetix] = useSynthetix();

  return React.createElement(
    React.Fragment,
    {},
    React.createElement('h2', {}, 'Wallet'),
    synthetix.walletAddress
      ? React.createElement(Connected)
      : React.createElement('button', { onClick: window.__connect }, 'Connect')
  );
}
