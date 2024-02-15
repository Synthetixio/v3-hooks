const { ethers } = require('ethers');
const { getContract } = require('../../lib/getContract');

async function createAccount({ privateKey }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  const chainId = network.chainId;
  const preset = process.env.CYPRESS_SYNTHETIX_PRESET || 'main';

  const wallet = new ethers.Wallet(privateKey, provider);

  const { address, abi } = getContract(chainId, preset, 'CoreProxy');
  const CoreProxy = new ethers.Contract(address, abi, wallet);

  const accountId = parseInt(`1337${require('crypto').randomInt(1000)}`);

  const currentAccountOwner = await CoreProxy.getAccountOwner(accountId);
  console.log('createAccount', { accountId, currentAccountOwner });

  const tx = await CoreProxy['createAccount(uint128)'](accountId, { gasLimit: 10_000_000 });
  await tx.wait();

  const newAccountOwner = await CoreProxy.getAccountOwner(accountId);
  console.log('createAccount', { accountId, newAccountOwner });

  return accountId;
}

module.exports = {
  createAccount,
};
