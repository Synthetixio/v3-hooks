const React = require('react');
const { QueryClient, QueryClientProvider } = require('@tanstack/react-query');
const { SynthetixContext } = require('./SynthetixContext');
const { SynthetixQueryContext } = require('./SynthetixQueryContext');

function SynthetixProvider({
  chainId,
  preset,
  signer,
  provider,
  isConnected,
  walletAddress,
  children,
}) {
  const client = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {},
        },
      }),
    []
  );
  const [state, setState] = React.useState({
    chainId,
    preset,
    signer,
    provider,
    isConnected,
    walletAddress,
  });
  return React.createElement(
    QueryClientProvider,
    { client, context: SynthetixQueryContext },
    React.createElement(SynthetixContext.Provider, { value: [state, setState] }, children)
  );
}

module.exports = {
  SynthetixProvider,
};
