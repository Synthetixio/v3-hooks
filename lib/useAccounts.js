const React = require('react');
const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');

function useAccounts({ walletAddress } = {}) {
  const [synthetix] = useSynthetix();

  return useQuery(
    {
      queryKey: [`${synthetix.chainId}-${synthetix.preset}`, walletAddress, 'Accounts'],
      enabled: Boolean(walletAddress && synthetix.reader),
      queryFn: async function () {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'AccountProxy');
        const numberOfAccountTokens = await synthetix.reader({
          address,
          abi,
          functionName: 'balanceOf',
          args: [walletAddress],
        });
        const accounts = await Promise.all(
          Array.from(Array(parseInt(numberOfAccountTokens))).map((_, accountIndex) =>
            synthetix.reader({
              address,
              abi,
              functionName: 'tokenOfOwnerByIndex',
              args: [walletAddress, accountIndex],
            })
          )
        );
        return accounts.map((accountId) => accountId.toString());
      },
    },
    synthetix.queryClient
  );
}

module.exports = {
  useAccounts,
};
