exports.address = '0x32C222A9A159782aFD7529c87FA34b96CA72C696';
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
