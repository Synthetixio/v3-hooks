const { deployments } = require('./deployments');
const { useSynthetix } = require('./useSynthetix');

function useIsChainSupported() {
  const [synthetix] = useSynthetix();
  return Boolean(deployments?.[synthetix.chainId]?.[synthetix.preset]);
}

exports.useIsChainSupported = useIsChainSupported;
