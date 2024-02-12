import * as React from 'react';
import { SynthetixProvider } from '../lib/SynthetixProvider';
import { Home } from './Home';

export function App() {
  return React.createElement(
    SynthetixProvider,
    {
      chainId: window.ethereum ? Number(window.ethereum.chainId) : undefined,
      preset: 'andromeda',
      signer: window.ethereum,
      isConnected: window.ethereum ? window.ethereum.isConnected() : false,
      walletAddress: window.ethereum ? window.ethereum.selectedAddress : undefined,
    },
    React.createElement(Home)
  );
}
