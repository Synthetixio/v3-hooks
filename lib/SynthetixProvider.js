const React = require('react');
const { QueryClient, QueryClientProvider } = require('@tanstack/react-query');
const {
  SynthetixContext,
  SYNTHETIX_INITIAL_STATE,
  SYNTHETIX_STATE_KEYS,
} = require('./SynthetixContext');
const { SynthetixQueryContext } = require('./SynthetixQueryContext');

function SynthetixProvider({ children, ...props }) {
  const client = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {},
        },
      }),
    []
  );

  const [state, setState] = React.useState(
    Object.entries(props).reduce(
      (state, [key, val]) =>
        SYNTHETIX_STATE_KEYS.includes(key) && state[key] !== val ? { ...state, [key]: val } : state,
      SYNTHETIX_INITIAL_STATE
    )
  );
  return React.createElement(
    QueryClientProvider,
    { client, context: SynthetixQueryContext },
    React.createElement(SynthetixContext.Provider, { value: [state, setState] }, children)
  );
}

module.exports = {
  SynthetixProvider,
};
