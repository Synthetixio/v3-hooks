const { ethers } = require('ethers');

window.ethers = ethers;

function createReader({ provider }) {
  return async ({ address, abi, functionName, args }) => {
    const Contract = new ethers.Contract(address, abi, provider);
    return await Contract[functionName](...args);
  };
}

function createWriter({ signer }) {
  return async ({
    account,
    address,
    abi,
    functionName,
    args,
    gasBufferPercent = 50, // Extra 50% buffer for gas
  }) => {
    const abiWithErrors = abi.concat(require('../deployments/AllErrors').abi);
    const Contract = new ethers.Contract(address, abiWithErrors, signer);

    try {
      const gasEstimate = await Contract.estimateGas[functionName](...args);
      console.log(functionName, { gasEstimate });
      const gasLimit = gasEstimate.mul(ethers.BigNumber.from(gasBufferPercent).add(100)).div(100);
      console.log(functionName, { gas: gasLimit });
      const tx = await Contract[functionName](...args, { gasLimit });
      console.log(functionName, { hash: tx.hash });

      return {
        hash: tx.hash,
        wait: async () => {
          const receipt = await tx.wait();
          const events = receipt.events.map((event) =>
            Object.assign(event, { eventName: event.event })
          );
          console.log(functionName, { receipt });
          return { ...receipt, events };
        },
      };
    } catch (error) {
      console.log(functionName, { error });
      // TODO: parse error from ethers
      throw error;
    }
  };
}

module.exports = {
  createReader,
  createWriter,
};
