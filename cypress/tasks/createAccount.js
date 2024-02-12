const { ethers } = require('ethers');

async function createAccount({ privateKey }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  const chainId = network.chainId;
  const preset = process.env.CYPRESS_SYNTHETIX_PRESET || 'main';

  const wallet = new ethers.Wallet(privateKey, provider);

  const CoreProxy = new ethers.Contract(
    require(`@synthetixio/v3-contracts/${chainId}-${preset}/meta.json`).contracts.CoreProxy,
    require(`@synthetixio/v3-contracts/${chainId}-${preset}/CoreProxy.readable.json`),
    wallet
  );

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
