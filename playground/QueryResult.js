export function QueryResult({ isError, error, isLoading, children }) {
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return (
      <>
        {error ? (
          <code style={{ color: '#f00', margin: 0, fontFamily: 'monospace' }}>{error.stack}</code>
        ) : (
          'Error'
        )}
      </>
    );
  }

  return <>{children}</>;
}
