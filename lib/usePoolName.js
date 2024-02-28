const React = require('react');
const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');

function usePoolName({ poolId } = {}) {
  const [synthetix] = useSynthetix();

  return useQuery(
    {
      queryKey: [`${synthetix.chainId}-${synthetix.preset}`, { poolId }, 'Pool name'],
      enabled: Boolean(poolId && synthetix.reader),
      queryFn: async () => {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'CoreProxy');
        const poolName = synthetix.reader({
          address,
          abi,
          functionName: 'getPoolName',
          args: [BigInt(poolId)],
        });

        return poolName;
      },
    },
    synthetix.queryClient
  );
}

module.exports = {
  usePoolName,
};
