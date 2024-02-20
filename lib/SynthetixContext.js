const { createContext } = require('react');
const SYNTHETIX_INITIAL_STATE = Object.freeze({
  isViem: false,
  isEthers: false,
  chainId: undefined,
  preset: 'main',
  signer: undefined,
  provider: undefined,
  isConnected: false,
  walletAddress: undefined,
});
const SYNTHETIX_STATE_KEYS = Object.keys(SYNTHETIX_INITIAL_STATE);

const SynthetixContext = createContext([SYNTHETIX_INITIAL_STATE, () => {}]);

module.exports = {
  SYNTHETIX_INITIAL_STATE,
  SYNTHETIX_STATE_KEYS,
  SynthetixContext,
};
