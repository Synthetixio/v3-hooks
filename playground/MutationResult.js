import * as React from 'react';

export function MutationResult({ isError, error, isPending, children }) {
  if (isPending) {
    return <div>Updating...</div>;
  }

  if (isError) {
    return (
      <div style={{ color: '#f00' }}>
        {error ? <pre style={{ margin: 0 }}>{error.stack}</pre> : 'Error'}
      </div>
    );
  }

  return <>{children}</>;
}
