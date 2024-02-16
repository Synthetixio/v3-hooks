const React = require('react');
const { SynthetixContext, SYNTHETIX_STATE_KEYS } = require('./SynthetixContext');

function useBlockchain() {
  const [state] = React.useContext(SynthetixContext);
  return state;
}

function useUpdateBlockchain() {
  const [_, setState] = React.useContext(SynthetixContext);
  return React.useCallback((updates) =>
    setState((oldState) =>
      Object.entries(updates).reduce(
        (state, [key, val]) =>
          SYNTHETIX_STATE_KEYS.includes(key) && state[key] !== val
            ? { ...state, [key]: val }
            : state,
        oldState
      )
    )
  );
}

module.exports = {
  useBlockchain,
  useUpdateBlockchain,
};
