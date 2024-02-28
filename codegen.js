#!/usr/bin/env node

const path = require('node:path');
const fs = require('node:fs/promises');

const ABI_WHITELIST = {
  CoreProxy: {
    getAccountOwner: true,
    createAccount: true,
    AccountCreated: true,
    getApprovedPools: true,
    getPreferredPool: true,
    getPoolName: true,
  },
  AccountProxy: {
    balanceOf: true,
    tokenOfOwnerByIndex: true,
  },
};

async function codegen() {
  const deploymentsDir = path.dirname(require.resolve('@synthetixio/v3-contracts'));
  const supportedDeployments = (await fs.readdir(deploymentsDir, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const [chainIdString, preset] = dirent.name.split('-');
      const chainId = chainIdString && parseInt(chainIdString);
      if (chainId && preset) {
        return { chainId, preset };
      }
      return null;
    })
    .filter(Boolean);
  console.log({ supportedDeployments });

  await fs.rm('lib/deployments', { force: true, recursive: true });
  await fs.mkdir('lib/deployments', { recursive: true });

  const index = [
    //
    'const deployments = {};',
  ];
  const AllErrors = new Set();
  for (const { chainId, preset } of supportedDeployments) {
    await fs.mkdir(`./lib/deployments/${chainId}-${preset}`, { recursive: true });
    const meta = JSON.parse(
      await fs.readFile(
        require.resolve(`@synthetixio/v3-contracts/${chainId}-${preset}/meta.json`),
        'utf8'
      )
    );

    index.push('');
    index.push(`deployments["${chainId}"] = {};`);
    index.push(`deployments["${chainId}"]["${preset}"] = {};`);

    for (const [contractName, address] of Object.entries(meta.contracts)) {
      console.log({ chainId, preset, contractName, address });

      const fullAbi = JSON.parse(
        await fs.readFile(
          require.resolve(`@synthetixio/v3-contracts/${chainId}-${preset}/${contractName}.json`),
          'utf8'
        )
      );
      const abi = fullAbi.filter(({ name }) => ABI_WHITELIST?.[contractName]?.[name] === true);

      await fs.writeFile(
        `./lib/deployments/${chainId}-${preset}/${contractName}.js`,
        `
          exports.address = ${JSON.stringify(address)};
          exports.abi = ${JSON.stringify(abi)};
        `,
        'utf8'
      );

      index.push(
        `deployments["${chainId}"]["${preset}"]["${contractName}"] = require('./${chainId}-${preset}/${contractName}')`
      );
    }

    // Generate AllErrors
    const abi = JSON.parse(
      await fs.readFile(
        require.resolve(`@synthetixio/v3-contracts/${chainId}-${preset}/AllErrors.readable.json`),
        'utf8'
      )
    );

    for (const e of abi) {
      AllErrors.add(e);
    }
  }

  const { Interface } = require('@ethersproject/abi');
  await fs.writeFile(
    './lib/deployments/AllErrors.js',
    `
      exports.abi = ${new Interface(Array.from(AllErrors)).format('json')};
    `,
    'utf8'
  );
  index.push(`deployments["AllErrors"] = require('./AllErrors')`);

  index.push('exports.deployments = deployments;');

  await fs.writeFile('./lib/deployments/index.js', index.join('\n'), 'utf8');
}

codegen();
