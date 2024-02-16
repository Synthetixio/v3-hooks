import { formatEther } from 'viem';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  custom,
  serializeTransaction,
  parseAbi,
  getAbiItem,
  encodeFunctionData,
  createPublicClient,
  createWalletClient,
} from 'viem';
import { SynthetixProvider } from '../lib/SynthetixProvider';
import { App } from './App';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

function number(obj) {
  if (obj === BigInt(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff)) {
    return 'MaxUint256';
  }
  if (obj === BigInt(0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff)) {
    return 'MaxInt256';
  }
  if (obj.abs().gt(1e10)) {
    // Assuming everything bigger than 1e10 is a wei
    return `wei ${parseFloat(formatEther(`${obj}`))}`;
  }
  return parseFloat(obj.toString());
}

window.devtoolsFormatters = window.devtoolsFormatters ?? [];
window.devtoolsFormatters.push({
  header: function (obj) {
    if (obj instanceof BigInt) {
      return [
        'div',
        { style: 'color: #f66' },
        ['span', {}, 'BigInt('],
        ['span', { style: 'color: #3f3' }, number(obj)],
        ['span', {}, ')'],
      ];
    }
    return null;
  },
  hasBody: function () {
    return false;
  },
});

async function run() {
  const root = ReactDOM.createRoot(container);

  const chainId = window.ethereum ? Number(window.ethereum.chainId) : undefined;
  const preset = 'andromeda';

  const signer = createWalletClient({ transport: custom(window.ethereum) });
  const provider = createPublicClient({ transport: custom(window.ethereum) });

  let [walletAddress] = await signer.getAddresses();

  // Autoconnect here until we have button in the UI
  if (!walletAddress) {
    [walletAddress] = await signer.requestAddresses();
  }

  const isConnected = Boolean(walletAddress);

  root.render(
    React.createElement(
      SynthetixProvider,
      { isViem: true, chainId, preset, signer, provider, isConnected, walletAddress },
      React.createElement(App)
    )
  );
}

run();
