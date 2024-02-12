import { ethers } from 'ethers';
import { metamask } from '../lib/metamask';
import { onLogAdded } from '../lib/onLogAdded';

beforeEach(() => {
  cy.on('log:added', onLogAdded);

  cy.on('window:before:load', async (win) => {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const network = await provider.getNetwork();
  });
});

Cypress.Commands.add('connectWallet', (namespace = 'wallet') => {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  cy.on('window:before:load', (win) => {
    win.ethereum = metamask({ privateKey, address });
  });

  return cy.wrap(wallet).as(namespace);
});
