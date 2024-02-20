const React = require('react');
const { SynthetixContext, SYNTHETIX_STATE_KEYS } = require('./SynthetixContext');

function useConfig() {
  const [config, setState] = React.useContext(SynthetixContext);

  const updateConfig = React.useCallback((updates) =>
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

  return [config, updateConfig];
}

module.exports = {
  useConfig,
};
