import { InjectedConnector } from '@web3-react/injected-connector';

// Polygon Network ID
export const CHAIN_ID = 137;

export const connectors = {
  metamask: {
    connector: new InjectedConnector({
      supportedChainIds: [CHAIN_ID],
    }),
    name: 'MetaMask',
    icon: '/wallet-icons/metamask.svg',
    description: 'Connect with your MetaMask wallet',
  },
} as const;

export type WalletConnector = keyof typeof connectors;