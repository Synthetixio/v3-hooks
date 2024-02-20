import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Home } from './Home';
const { useSynthetix } = require('../lib/useSynthetix');

export function App() {
  const [synthetix] = useSynthetix();
  return React.createElement(
    React.Fragment,
    {},
    React.createElement(ReactQueryDevtools, { client: synthetix.queryClient }),
    React.createElement(Home)
  );
}
