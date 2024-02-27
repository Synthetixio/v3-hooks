const debug = require('debug');
const {
  encodeFunctionData,
  BaseError,
  ContractFunctionRevertedError,
  parseEventLogs,
} = require('viem');

function createReader({ publicClient }) {
  return async ({ address, abi, functionName, args }) => {
    return await publicClient.readContract({ address, abi, functionName, args });
  };
}

function createWriter({ publicClient, walletClient }) {
  return async ({
    account,
    address,
    abi,
    functionName: functionNameFull,
    args,
    gasBufferPercent = 50, // Extra 50% buffer for gas
  }) => {
    const log = debug(`synthetix:viem:${functionNameFull}`);

    // Transform ethers-compatible function name `createAccount(uint128)` to a simple `createAccount`
    const [functionName] = functionNameFull.split('(');
    const abiWithErrors = abi.concat(require('../deployments/AllErrors').abi);

    try {
      const callData = encodeFunctionData({ abi: abiWithErrors, args, functionName });
      log({ callData });
      const simulation = await publicClient.simulateContract({
        account,
        address,
        abi: abiWithErrors,
        functionName,
        args,
      });
      // Ignore the result as we only care that it does not throw an error
      log({ simulation });

      const gasEstimate = await publicClient.estimateGas({
        account,
        to: address,
        data: callData,
      });
      log({ gasEstimate });
      const gas = (gasEstimate * (100n + BigInt(gasBufferPercent))) / 100n;
      log({ gas });
      const hash = await walletClient.writeContract({ ...simulation.request, gas });
      log({ hash });
      return {
        hash,
        wait: async () => {
          const receipt = await publicClient.waitForTransactionReceipt({ hash });
          const events = parseEventLogs({
            abi,
            logs: receipt.logs,
          });
          return { ...receipt, events };
        },
      };
    } catch (error) {
      if (error instanceof BaseError) {
        const revertError = error.walk((err) => err instanceof ContractFunctionRevertedError);
        if (revertError instanceof ContractFunctionRevertedError) {
          // later we will parse it for ERC7412 errors here

          const errorName = revertError.data?.errorName ?? '';
          log({ revert: revertError.data, revertError });
          throw Object.assign(new Error(errorName), {
            name: errorName,
            args: revertError.data?.args ?? [],
          });
        }
      }
      log({ revert: error });
      throw error;
    }
  };
}

module.exports = {
  createReader,
  createWriter,
};
