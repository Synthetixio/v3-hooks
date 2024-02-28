export function QueryResult({ isError, error, isLoading, children }) {
  if (isLoading) {
    return <div>Loading...</div>;
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
