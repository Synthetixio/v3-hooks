const React = require('react');
const { useMutation } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');
const { useAccountsOwned } = require('./useAccountsOwned');

function useCreateAccount() {
  const [synthetix] = useSynthetix();
  const accountsOwned = useAccountsOwned({ walletAddress: synthetix.walletAddress });

  return useMutation(
    {
      mutationKey: [
        `${synthetix.chainId}-${synthetix.preset}`,
        synthetix.walletAddress,
        'Create account',
        { accountsOwned: accountsOwned.data },
      ],
      mutationFn: async function ({ accountId } = {}) {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'CoreProxy');
        //        synthetix.writer({})

        //
        //        const { request } = await publicClient.simulateContract({
        //  account,
        //  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
        //  abi: wagmiAbi,
        //  functionName: 'mint',
        //})
        //await walletClient.writeContract(request)

        //        const gasLimit = await synthetix.estimateGas({
        //          address,
        //          abi,
        //          functionName: accountId ? 'createAccount(uint128)' : 'createAccount()',
        //          args: accountId ? [accountId] : [],
        //        });
        const tx = await synthetix
          .writer({
            account: synthetix.walletAddress,
            address,
            abi,
            functionName: accountId ? 'createAccount(uint128)' : 'createAccount()',
            args: accountId ? [BigInt(accountId)] : [],
          })
          .catch(console.error);
        console.log(tx);

        //        tx.logs.forEach((log) => {
        //          if (log.topics[0] === CoreProxy.interface.getEventTopic('AccountCreated')) {
        //            const accountId = CoreProxy.interface.decodeEventLog(
        //              'AccountCreated',
        //              log.data,
        //              log.topics
        //            )?.accountId;
        //            newAccountId = accountId?.toString();
        //          }
        //        });

        return accountId;
      },
    },
    synthetix.queryClient
  );
}

module.exports = {
  useCreateAccount,
};
