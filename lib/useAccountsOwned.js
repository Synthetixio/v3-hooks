const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');

function useAccountsOwned({ walletAddress } = {}) {
  const [synthetix] = useSynthetix();

  return useQuery(
    {
      queryKey: [`${synthetix.chainId}-${synthetix.preset}`, walletAddress, 'Accounts Count'],
      enabled: Boolean(walletAddress && synthetix.reader),
      queryFn: async () => {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'AccountProxy');
        const accountsOwned = await synthetix.reader({
          address,
          abi,
          functionName: 'balanceOf',
          args: [walletAddress],
        });

        return accountsOwned;
      },
      select: (accountsOwned) => Number(accountsOwned),
    },
    synthetix.queryClient
  );
}

module.exports = {
  useAccountsOwned,
};
