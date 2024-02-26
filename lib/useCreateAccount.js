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
        console.log(`tx`, tx);

        const receipt = await tx.wait();
        console.log(`receipt`, receipt);

        const accountCreatedEvent = receipt.events.find(
          (event) => event.eventName === 'AccountCreated'
        );
        console.log(`accountCreatedEvent`, accountCreatedEvent);

        if (!accountCreatedEvent) {
          throw new Error('Could not find AccountCreated event');
        }

        const owner = `${accountCreatedEvent?.args?.owner}`.toLowerCase();
        console.log(`owner`, owner);

        if (owner !== synthetix.walletAddress) {
          throw new Error(
            `New account owner "${owner}" does not match connected wallet ${synthetix.walletAddress}`
          );
        }

        const createdAccountId = accountCreatedEvent?.args?.accountId;
        console.log(`createdAccountId`, createdAccountId);

        if (!createdAccountId) {
          throw new Error(`Could not create account "${createdAccountId}"`);
        }

        // fill the data in query cache
        synthetix.queryClient.setQueryData(
          [`${synthetix.chainId}-${synthetix.preset}`, owner, 'Accounts'],
          (oldAccounts) => oldAccounts.concat([String(createdAccountId)])
        );
        synthetix.queryClient.setQueryData(
          [
            `${synthetix.chainId}-${synthetix.preset}`,
            { accountId: String(createdAccountId) },
            'Account Owner',
          ],
          owner
        );
        return accountCreatedEvent?.args?.accountId;
      },
    },
    synthetix.queryClient
  );
}

module.exports = {
  useCreateAccount,
};
