const React = require('react');
const { QueryClient } = require('@tanstack/react-query');
const SYNTHETIX_INITIAL_STATE = Object.freeze({
  chainId: undefined,
  preset: 'main',
  reader: undefined,
  writer: undefined,
  walletAddress: undefined,
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {},
    },
  }),
});
const SYNTHETIX_STATE_KEYS = Object.keys(SYNTHETIX_INITIAL_STATE);

const SynthetixContext = React.createContext([SYNTHETIX_INITIAL_STATE, () => {}]);

function SynthetixProvider({ children, ...props }) {
  const [state, setState] = React.useState(
    Object.entries(props).reduce(
      (newState, [key, val]) =>
        SYNTHETIX_STATE_KEYS.includes(key) && newState[key] !== val
          ? Object.assign(newState, { [key]: val })
          : newState,
      Object.assign({}, SYNTHETIX_INITIAL_STATE)
    )
  );

  return React.createElement(SynthetixContext.Provider, { value: [state, setState] }, children);
}

function useSynthetix() {
  const [state, setState] = React.useContext(SynthetixContext);

  const updateState = React.useCallback((updates) =>
    setState((oldState) =>
      Object.entries(updates).reduce(
        (state, [key, val]) =>
          SYNTHETIX_STATE_KEYS.includes(key) && state[key] !== val
            ? Object.assign(state, { [key]: val })
            : state,
        Object.assign({}, oldState)
      )
    )
  );

  return [state, updateState];
}

module.exports = {
  useSynthetix,
  SYNTHETIX_INITIAL_STATE,
  SYNTHETIX_STATE_KEYS,
  SynthetixContext,
  SynthetixProvider,
};
