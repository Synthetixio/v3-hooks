const debug = require('debug');
const { ethers } = require('ethers');

function createReader({ provider }) {
  return async ({ address, abi, functionName, args = [] }) => {
    const Contract = new ethers.Contract(address, abi, provider);
    return await Contract[functionName](...args);
  };
}

function createWriter({ signer }) {
  return async ({
    // account,
    address,
    abi,
    functionName,
    args = [],
    gasBufferPercent = 50, // Extra 50% buffer for gas
  }) => {
    const log = debug(`synthetix:ethers:${functionName}`);

    const abiWithErrors = abi.concat(require('../deployments/AllErrors').abi);
    const Contract = new ethers.Contract(address, abiWithErrors, signer);

    try {
      const gasEstimate = await Contract.estimateGas[functionName](...args);
      log({ gasEstimate });
      const gasLimit = gasEstimate.mul(ethers.BigNumber.from(gasBufferPercent).add(100)).div(100);
      log({ gas: gasLimit });
      const tx = await Contract[functionName](...args, { gasLimit });
      log({ hash: tx.hash });

      return {
        hash: tx.hash,
        wait: async () => {
          const receipt = await tx.wait();
          const events = receipt.events.map((event) =>
            Object.assign(event, { eventName: event.event })
          );
          log({ receipt });
          return { ...receipt, events };
        },
      };
    } catch (error) {
      log({ error });

      const errorData =
        error?.error?.error?.error?.data || error?.error?.data?.data || error?.error?.error?.data;
      if (!errorData) {
        log({ error });
        throw error;
      }
      const data = Contract.interface.parseError(errorData);
      log({ data, error });
      throw Object.assign(new Error(data.name), {
        name: data.name,
        args: data?.args ?? [],
      });
    }
  };
}

module.exports = {
  createReader,
  createWriter,
};
