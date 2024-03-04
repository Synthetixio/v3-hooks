import { useSynthetix } from '../lib/useSynthetix';

function href({ chainId, address }) {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/address/${address}`;
    case 5:
      return `https://goerli.etherscan.io/address/${address}`;
    case 11155111:
      return `https://sepolia.etherscan.io/address/${address}`;
    case 10:
      return `https://optimistic.etherscan.io/address/${address}`;
    case 420:
      return `https://goerli-optimism.etherscan.io/address/${address}`;
    case 80001:
      return `https://mumbai.polygonscan.com/address/${address}`;
    case 8453:
      return `https://basescan.org/address/${address}`;
    case 84531:
      return `https://goerli.basescan.org/address/${address}`;
    case 84532:
      return `https://sepolia.basescan.org/address/${address}`;
  }
}

export function Address({ address }) {
  const [synthetix] = useSynthetix();

  return (
    <a
      data-testid="address"
      href={href({ chainId: synthetix.chainId, address })}
      target="_blank"
      rel="noopener noreferrer"
    >
      <code title={address.toLowerCase()}>
        {address
          .substring(0, 6)
          .concat('...')
          .concat(address.substring(address.length - 4))
          .toLowerCase()}
      </code>{' '}
      <span
        title="Copy address to clipboard"
        onKeyDown={() => {}}
        onClick={(e) => {
          e.preventDefault();
          try {
            navigator.clipboard.writeText(address.toLowerCase());
          } catch (error) {
            console.error(error);
          }
        }}
      >
        📋
      </span>
    </a>
  );
}
