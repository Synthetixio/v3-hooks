exports.address = '0xe487Ad4291019b33e2230F8E2FB1fb6490325260';
exports.abi = [
  {
    type: 'function',
    name: 'balanceOf',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [{ type: 'address', name: 'holder' }],
    outputs: [{ type: 'uint256', name: 'balance' }],
  },
  {
    type: 'function',
    name: 'tokenOfOwnerByIndex',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [
      { type: 'address', name: 'owner' },
      { type: 'uint256', name: 'index' },
    ],
    outputs: [{ type: 'uint256' }],
  },
];
