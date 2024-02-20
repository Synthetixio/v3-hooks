function createReader({ publicClient }) {
  return async ({ address, abi, functionName, args }) => {
    return await publicClient.readContract({ address, abi, functionName, args });
  };
}

module.exports = {
  createReader,
};
