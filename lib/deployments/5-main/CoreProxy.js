exports.address = '0x895CE54BBA4f14FeFbF0624673DC303054De0652';
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
