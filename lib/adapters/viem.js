function createReader({ publicClient }) {
  return async ({ address, abi, functionName, args }) => {
    return await publicClient.readContract({ address, abi, functionName, args });
  };
}

function createWriter({ publicClient, walletClient }) {
  console.log(`walletClient`, walletClient);
  console.log(`publicClient`, publicClient);

  return async ({ account, address, abi, functionName: functionNameFull, args }) => {
    // Transform ethers-compatible function name `createAccount(uint128)` to a simple `createAccount`
    const [functionName] = functionNameFull.split('(');
    //    const functionName = functionNameFull;
    const abiWithErrors = abi.concat(require('../deployments/AllErrors').abi);

    const { encodeFunctionData, decodeFunctionResult, decodeErrorResult } = require('viem/utils');

    try {
      const callData = encodeFunctionData({ abi: abiWithErrors, args, functionName });
      console.log('encodeFunctionData', { callData });

      const estimatedGas = await publicClient.request({
        method: 'eth_estimateGas',
        params: [{ from: account, to: address, data: callData }],
      });
      const gas = BigInt(estimatedGas) * 2n;
      console.log('estimateGas', { gas });
      const simulation = await publicClient.call({ account, to: address, data: callData, gas });
      const result = decodeFunctionResult({
        abi,
        args,
        functionName,
        data: simulation.data || '0x',
      });
      // Ignore the result as we only care that it does not throw an error
      console.log(`decodeFunctionResult`, { result });

      const tx = await walletClient.sendTransaction({
        account,
        to: address,
        data: callData,
        gas,
      });
      //      const response = await walletClient.request({
      //        method: 'eth_sendTransaction',
      //        params: [{ from: account, to: address, data: callData, gas }],
      //      });
      console.log(`response`, response);
    } catch (error) {
      console.error(error);
      const decoded = decodeErrorResult({ abi: abiWithErrors, data: error.cause.data.data });
      console.log(`decodeErrorResult`, { decoded });
      //      const err = decodeErrorResult(error, {
      //        abi: abiWithErrors,
      //        address,
      //        args,
      //        functionName,
      //      });

      // later we will parse it for ERC7412 errors here
    }
    return;
    //    const simulation = await publicClient
    //      .call({
    //        account,
    //        to: address,
    //        data,
    //      })
    //      .catch((error) => {
    //        console.log(`error.data`, error.data);
    //        console.log(`{error}`, { error });
    //        //      const err = decodeErrorResult(error, {
    //        //        abi: abiWithErrors,
    //        //        address,
    //        //        args,
    //        //        functionName,
    //        //      });
    //        //      console.log('call', { error });
    //        //      console.log(`err`, err);
    //      });

    //    const simulation = await publicClient.simulateContract({
    //      account,
    //      address,
    //      abi: abiWithErrors,
    //      functionName,
    //      args,
    //    });
    //    console.log(`simulation`, simulation);
    return;

    const gas = await publicClient.estimateGas({ data, account, to: address });
    console.log(`gas`, gas);

    const result = await publicClient.call({ from: account, to: address, data }).catch((error) => {
      console.log(`{error}`, { error });
      //      const err = decodeErrorResult(error, {
      //        abi: abiWithErrors,
      //        address,
      //        args,
      //        functionName,
      //      });
      //      console.log('call', { error });
      //      console.log(`err`, err);
    });
    console.log(`result`, result);

    //    const txn = await walletClient.request({
    //      method: 'eth_sendTransaction',
    //      params: [{ from: account, to: address, data }],
    //    });
    //    console.log(`txn`, txn);

    return;
    //    const result = await publicClient.call({ to: address, data }).catch((error) => {
    //      const err = getContractError(error, {
    //        abi: ,
    //        address,
    //        args,
    //        functionName,
    //      });
    //      console.log('call', { error });
    //      console.log(`err`, err);
    //    });
    //    console.log(`result`, result);
    //    const result = await walletClient.writeContract(simulation.request);
    //    console.log(`result`, result);
    return result;
  };
}

module.exports = {
  createReader,
  createWriter,
};
