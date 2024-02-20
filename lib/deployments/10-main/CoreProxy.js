exports.address = '0xffffffaEff0B96Ea8e4f94b2253f31abdD875847';
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
