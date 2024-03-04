import { useIsChainSupported } from '../lib/useIsChainSupported';
import { useSynthetix } from '../lib/useSynthetix';
import { Address } from './Address';

function Connected() {
  const [synthetix] = useSynthetix();
  const isChainSupported = useIsChainSupported();

  return (
    <>
      {!isChainSupported ? (
        <>
          <b className="error">
            Chain "{synthetix.chainId}" is not supported, switch in your wallet
          </b>
          <br />
        </>
      ) : null}
      Connected as <Address address={synthetix.walletAddress} />
    </>
  );
}

export function Wallet() {
  const [synthetix] = useSynthetix();

  return (
    <>
      <h2>Wallet</h2>
      {synthetix.walletAddress ? (
        <Connected />
      ) : (
        <button type="button" onClick={window.__connect}>
          Connect
        </button>
      )}
    </>
  );
}
