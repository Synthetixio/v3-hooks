const React = require('react');
const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useBlockchain } = require('./useBlockchain');

function useAccounts({ walletAddress } = {}) {
  const blockchain = useBlockchain();
  console.log(`blockchain`, blockchain);

  return useQuery({
    queryKey: [`${blockchain.chainId}-${blockchain.preset}`, walletAddress, 'Accounts'],
    enabled: Boolean(walletAddress && (blockchain.signer || blockchain.provider)),
    queryFn: async function () {
      const { address, abi: readableAbi } = getContract(
        blockchain.chainId,
        blockchain.preset,
        'AccountProxy'
      );

      if (blockchain.isViem) {
        const { parseAbi } = require('viem');
        const abi = parseAbi(readableAbi);

        const numberOfAccountTokens = await blockchain.provider.readContract({
          address,
          abi,
          functionName: 'balanceOf',
          args: [walletAddress],
        });
        const accounts = await Promise.all(
          Array.from(Array(parseInt(numberOfAccountTokens))).map((_, accountIndex) =>
            blockchain.provider.readContract({
              address,
              abi,
              functionName: 'tokenOfOwnerByIndex',
              args: [walletAddress, accountIndex],
            })
          )
        );
        return accounts.map((accountId) => accountId.toString());
      }

      if (blockchain.isEthers) {
        const { ethers } = require('ethers');
        const AccountProxy = new ethers.Contract(address, readableAbi, blockchain.provider);
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
