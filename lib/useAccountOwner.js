const React = require('react');
const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');

function useAccountOwner({ accountId } = {}) {
  const [synthetix] = useSynthetix();

  return useQuery(
    {
      queryKey: [`${synthetix.chainId}-${synthetix.preset}`, { accountId }, 'Account Owner'],
      enabled: Boolean(accountId && synthetix.reader),
      queryFn: async function () {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'CoreProxy');
        const accountOwner = await synthetix.reader({
          address,
          abi,
          functionName: 'getAccountOwner',
          args: [accountId],
        });
        return accountOwner;
      },
    },
    synthetix.queryClient
  );
}

module.exports = {
  useAccountOwner,
};
