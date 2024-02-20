const { ethers } = require('ethers');

function createReader({ provider }) {
  return async ({ address, abi, functionName, args }) => {
    const Contract = new ethers.Contract(address, abi, provider);
    return await Contract[functionName](...args);
  };
}

module.exports = {
  createReader,
};
