import * as React from 'react';
import { SynthetixProvider } from '../lib/SynthetixProvider';
import { Home } from './Home';

export function App() {
  return React.createElement(
    SynthetixProvider,
    {
      chainId: Number(window.ethereum.chainId),
      preset: 'andromeda',
      signer: window.ethereum,
      isConnected: window.ethereum.isConnected(),
      walletAddress: window.ethereum.selectedAddress,
    },
    React.createElement(Home)
  );
}
