const React = require('react');
const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useConfig } = require('./useConfig');

function useAccounts({ walletAddress } = {}) {
  const [config] = useConfig();

  return useQuery({
    queryKey: [`${config.chainId}-${config.preset}`, walletAddress, 'Accounts'],
    enabled: Boolean(walletAddress && (config.signer || config.provider)),
    queryFn: async function () {
      const { address, abi: readableAbi } = getContract(
        config.chainId,
        config.preset,
        'AccountProxy'
      );

      if (config.isViem) {
        const { parseAbi } = require('viem');
        const abi = parseAbi(readableAbi);

        const numberOfAccountTokens = await config.provider.readContract({
          address,
          abi,
          functionName: 'balanceOf',
          args: [walletAddress],
        });
        const accounts = await Promise.all(
          Array.from(Array(parseInt(numberOfAccountTokens))).map((_, accountIndex) =>
            config.provider.readContract({
              address,
              abi,
              functionName: 'tokenOfOwnerByIndex',
              args: [walletAddress, accountIndex],
            })
          )
        );
        return accounts.map((accountId) => accountId.toString());
      }

      if (config.isEthers) {
        const { ethers } = require('ethers');
        const AccountProxy = new ethers.Contract(address, readableAbi, config.provider);
        const numberOfAccountTokens = await AccountProxy.balanceOf(walletAddress);
        if (numberOfAccountTokens.eq(0)) {
          // No accounts created yet
          return [];
        }
        const accounts = await Promise.all(
          Array.from(Array(numberOfAccountTokens.toNumber())).map((_, accountIndex) =>
            AccountProxy.tokenOfOwnerByIndex(walletAddress, accountIndex)
          )
        );
        return accounts.map((accountId) => accountId.toString());
      }

      return [];
    },
  });
}

module.exports = {
  useAccounts,
};
