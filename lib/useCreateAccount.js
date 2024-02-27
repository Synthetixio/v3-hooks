const React = require('react');
const debug = require('debug');
const { useMutation } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useSynthetix } = require('./useSynthetix');
const { useAccountsOwned } = require('./useAccountsOwned');

const log = debug('synthetix:useCreateAccount');

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
        const params = {
          account: synthetix.walletAddress,
          address,
          abi,
          functionName: accountId ? 'createAccount(uint128)' : 'createAccount()',
          args: accountId ? [BigInt(accountId)] : [],
        };
        log({ params });
        const tx = await synthetix.writer(params);
        log({ tx });

        const receipt = await tx.wait();
        log({ receipt });

        const accountCreatedEvent = receipt.events.find(
          (event) => event.eventName === 'AccountCreated'
        );
        log({ accountCreatedEvent });

        if (!accountCreatedEvent) {
          throw new Error('Could not find AccountCreated event');
        }

        const owner = `${accountCreatedEvent?.args?.owner}`.toLowerCase();
        log({ owner });

        if (owner !== synthetix.walletAddress) {
          throw new Error(
            `New account owner "${owner}" does not match connected wallet ${synthetix.walletAddress}`
          );
        }

        const createdAccountId = accountCreatedEvent?.args?.accountId;
        log({ createdAccountId });

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

        return createdAccountId;
      },
    },
    synthetix.queryClient
  );
}

module.exports = {
  useCreateAccount,
};
