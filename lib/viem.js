const { useConfig } = require('./useConfig');
function useRead() {
  const blockchain = useConfig();
}
async function readContract({ address, abi }) {}
