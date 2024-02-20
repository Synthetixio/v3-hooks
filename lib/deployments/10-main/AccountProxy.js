exports.address = '0x0E429603D3Cb1DFae4E6F52Add5fE82d96d77Dac';
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
