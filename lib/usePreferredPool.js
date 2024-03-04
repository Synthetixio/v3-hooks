const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');

function usePreferredPool() {
  const [synthetix] = useSynthetix();
  return useQuery(
    {
      queryKey: [`${synthetix.chainId}-${synthetix.preset}`, 'Preferred pool'],
      enabled: Boolean(synthetix.reader),
      queryFn: async () => {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'CoreProxy');
        const preferredPool = await synthetix.reader({
          address,
          abi,
          functionName: 'getPreferredPool',
        });

        return preferredPool;
      },
      select: (preferredPool) => String(preferredPool),
    },
    synthetix.queryClient
  );
}

module.exports = {
  usePreferredPool,
};
