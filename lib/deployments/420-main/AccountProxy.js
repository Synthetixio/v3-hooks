exports.address = '0x1b791d05E437C78039424749243F5A79E747525e';
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
