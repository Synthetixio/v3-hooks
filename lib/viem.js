const { useBlockchain } = require('./useBlockchain');
function useRead() {
  const blockchain = useBlockchain();
}
async function readContract({ address, abi }) {}
