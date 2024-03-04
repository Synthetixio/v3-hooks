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
      queryFn: async () => {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'AccountProxy');

        // TODO: multicall
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

        for (const account of accounts) {
          synthetix.queryClient.setQueryData(
            [
              `${synthetix.chainId}-${synthetix.preset}`,
              { accountId: String(account) },
              'Account Owner',
            ],
            walletAddress
          );
        }

        return accounts;
      },
      select: (accounts) => accounts.map((accountId) => String(accountId)),
    },
    synthetix.queryClient
  );
}

module.exports = {
  useAccounts,
};
