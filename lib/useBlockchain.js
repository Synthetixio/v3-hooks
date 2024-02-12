const React = require('react');
const { SynthetixContext } = require('./SynthetixContext');

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
          key in state && state[key] !== val ? { ...state, [key]: val } : state,
        oldState
      )
    )
  );
}

module.exports = {
  useBlockchain,
  useUpdateBlockchain,
};
