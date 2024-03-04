import { useApprovedPools } from '../lib/useApprovedPools';
import { usePoolName } from '../lib/usePoolName';
import { usePreferredPool } from '../lib/usePreferredPool';

export function Pool({ poolId }) {
  const poolName = usePoolName({ poolId });

  return poolId ? (
    <p data-testid="pool" data-pool-id={poolId}>
      {poolId}
      {poolName.isLoading ? (
        <span className="loading"> ...</span>
      ) : poolName.isError ? (
        <span className="error"> {poolName.error?.name ?? 'Error loading pool name'}</span>
      ) : poolName.data ? (
        ` ${poolName.data}`
      ) : (
        ' Unnamed pool'
      )}
    </p>
  ) : null;
}

export function Pools() {
  const preferredPool = usePreferredPool();
  const approvedPools = useApprovedPools();
  const pools = [preferredPool.data].concat(approvedPools.data).filter(Boolean);
  return (
    <>
      <h2>Pools</h2>
      <div data-testid="pools list">
        {preferredPool.isLoading || approvedPools.isLoading ? (
          <p className="loading">Loading pools...</p>
        ) : preferredPool.isError || approvedPools.isError ? (
          <p className="error">
            {approvedPools.error?.name || preferredPool.error?.name || 'Error loading pools'}
          </p>
        ) : pools ? (
          pools.map((poolId) => <Pool poolId={poolId} key={poolId} />)
        ) : (
          <p>No pools</p>
        )}
      </div>
    </>
  );
}
