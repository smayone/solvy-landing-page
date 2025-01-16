import { InjectedConnector } from '@web3-react/injected-connector';
import { SOLVY_CHAIN_ID } from './web3';

// MetaMask & Similar Injected Wallets
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [SOLVY_CHAIN_ID],
});

export const connectors = {
  injected: {
    name: 'MetaMask',
    connector: injectedConnector,
    icon: '/wallet-icons/metamask.svg',
    description: 'Connect using browser wallet',
    mobile: true,
    mobileOnly: false,
  },
};

export type WalletConnector = keyof typeof connectors;