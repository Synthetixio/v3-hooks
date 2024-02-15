const { deployments } = require('./deployments');

function getContract(chainId, preset, contractName) {
  if (
    chainId in deployments &&
    preset in deployments[chainId] &&
    contractName in deployments[chainId][preset]
  ) {
    return deployments[chainId][preset][contractName];
  }
  throw new Error(`Contract ${contractName} is not available in ${chainId}-${preset} deployment`);
}

exports.getContract = getContract;
