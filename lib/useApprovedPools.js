const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');

function useApprovedPools() {
  const [synthetix] = useSynthetix();
  return useQuery(
    {
      queryKey: [`${synthetix.chainId}-${synthetix.preset}`, 'Approved pools'],
      enabled: Boolean(synthetix.reader),
      queryFn: async () => {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'CoreProxy');
        const approvedPools = await synthetix.reader({
          address,
          abi,
          functionName: 'getApprovedPools',
        });

        return approvedPools;
      },
      select: (approvedPools) => approvedPools.map((poolId) => String(poolId)),
    },
    synthetix.queryClient
  );
}

module.exports = {
  useApprovedPools,
};
