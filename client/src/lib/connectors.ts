import { InjectedConnector } from '@web3-react/injected-connector';

// Polygon Network ID
export const CHAIN_ID = 137;

export const injected = new InjectedConnector({
  supportedChainIds: [CHAIN_ID],
});