exports.address = '0x63f4Dd0434BEB5baeCD27F3778a909278d8cf5b8';
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
