exports.address = '0xa88694d0025dd96194D1B0237fDEbf7D1D34B02F';
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
