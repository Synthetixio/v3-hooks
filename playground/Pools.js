import { useApprovedPools } from '../lib/useApprovedPools';
import { usePreferredPool } from '../lib/usePreferredPool';
import { usePoolName } from '../lib/usePoolName';
import { QueryResult } from './QueryResult';

export function Pool({ poolId }) {
  const poolName = usePoolName({ poolId });

  return poolId ? (
    <p data-testid="pool" data-pool-id={poolId}>
      {poolId}, <QueryResult {...poolName}>{poolName.data}</QueryResult>
    </p>
  ) : null;
}

export function Pools() {
  const preferredPool = usePreferredPool();
  const approvedPools = useApprovedPools();
  return (
    <>
      <h2>Pools</h2>
      <div data-testid="pools list">
        <QueryResult {...preferredPool}>
          <Pool poolId={preferredPool.data} />
        </QueryResult>
        <QueryResult {...approvedPools}>
          {approvedPools.data
            ? approvedPools.data.map((poolId) => <Pool poolId={poolId} key={poolId} />)
            : null}
        </QueryResult>
      </div>
    </>
  );
}
