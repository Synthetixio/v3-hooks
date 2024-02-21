const React = require('react');
const { useMutation } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');
const { useAccountsOwned } = require('./useAccountsOwned');

function useCreateAccount({ accountId } = {}) {
  const [synthetix] = useSynthetix();
  const accountsOwned = useAccountsOwned({ walletAddress: synthetix.walletAddress });

  return useMutation(
    {
      mutationKey: [
        `${synthetix.chainId}-${synthetix.preset}`,
        synthetix.walletAddress,
        'Create account',
        accountId ? { accountId } : { accountsOwned: accountsOwned.data },
      ],
      mutationFn: async function () {
        const { address, abi } = getContract(synthetix.chainId, synthetix.preset, 'CoreProxy');
        //        const gasLimit = await synthetix.estimateGas({
        //          address,
        //          abi,
        //          functionName: accountId ? 'createAccount(uint128)' : 'createAccount()',
        //          args: accountId ? [accountId] : [],
        //        });
        //        const tx = await synthetix.writer({
        //          address,
        //          abi,
        //          functionName: accountId ? 'createAccount(uint128)' : 'createAccount()',
        //          args: accountId ? [accountId] : [],
        //        });
        //        console.log(tx);

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
