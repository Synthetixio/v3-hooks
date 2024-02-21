const React = require('react');
const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');
const { useAccountsOwned } = require('./useAccountsOwned');

function useAccounts({ walletAddress } = {}) {
  const [synthetix] = useSynthetix();
  const accountsOwned = useAccountsOwned({ walletAddress });

  return useQuery(
    {
      queryKey: [`${synthetix.chainId}-${synthetix.preset}`, walletAddress, 'Accounts'],
      enabled: Boolean(walletAddress && synthetix.reader && accountsOwned.data),
      queryFn: async function () {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'AccountProxy');
        const accounts = await Promise.all(
          Array.from(Array(parseInt(accountsOwned.data))).map((_, accountIndex) =>
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
