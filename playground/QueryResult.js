import * as React from 'react';

export function QueryResult({ isError, error, isLoading, children }) {
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>{error ? <pre>{error.stack}</pre> : 'Error'}</>;
  }

  return <>{children}</>;
}
