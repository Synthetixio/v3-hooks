const React = require('react');
const { useQuery } = require('@tanstack/react-query');
const { getContract } = require('./getContract');
const { useBlockchain } = require('./useBlockchain');

function useAccounts({ walletAddress } = {}) {
  const blockchain = useBlockchain();
  return useQuery({
    queryKey: [`${blockchain.chainId}-${blockchain.preset}`, walletAddress, 'Accounts'],
    enabled: Boolean(walletAddress && (blockchain.signer || blockchain.provider)),
    queryFn: async function () {
      // TODO: switch to abstract callbacks later, temporarily use ethers for now
      const { ethers } = require('ethers');
      if (!ethers.utils.isAddress(walletAddress)) {
        throw new Error(`Not an address: "${walletAddress}"`);
      }
      const { address, abi } = getContract(blockchain.chainId, blockchain.preset, 'AccountProxy');
      const signerOrProvider = new ethers.providers.Web3Provider(
        blockchain.signer || blockchain.provider
      );
      const AccountProxy = new ethers.Contract(address, abi, signerOrProvider);
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
    },
  });
}

module.exports = {
  useAccounts,
};
