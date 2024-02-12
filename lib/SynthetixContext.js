const { createContext } = require('react');
const SynthetixContext = createContext([
  {
    chainId: undefined,
    preset: 'main',
    signer: undefined,
    isConnected: false,
    walletAddress: undefined,
  },
  () => {},
]);

module.exports = {
  SynthetixContext,
};
