exports.address = '0x76490713314fCEC173f44e99346F54c6e92a8E42';
exports.abi = [
  {
    type: 'function',
    name: 'createAccount',
    constant: false,
    payable: false,
    inputs: [],
    outputs: [{ type: 'uint128', name: 'accountId' }],
  },
  {
    type: 'function',
    name: 'createAccount',
    constant: false,
    payable: false,
    inputs: [{ type: 'uint128', name: 'requestedAccountId' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'getAccountOwner',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [{ type: 'uint128', name: 'accountId' }],
    outputs: [{ type: 'address' }],
  },
];
