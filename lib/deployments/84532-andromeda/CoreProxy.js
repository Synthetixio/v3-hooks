exports.address = '0xF4Df9Dd327Fd30695d478c3c8a2fffAddcdD0d31';
exports.abi = [
  {
    type: 'event',
    anonymous: false,
    name: 'AccountCreated',
    inputs: [
      { type: 'uint128', name: 'accountId', indexed: true },
      { type: 'address', name: 'owner', indexed: true },
    ],
  },
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
