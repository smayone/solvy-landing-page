import { ethers } from 'ethers';

// Polygon Network ID
export const CHAIN_ID = 137;

export type WalletInfo = {
  name: string;
  icon: string;
  description: string;
};

export const wallets: Record<string, WalletInfo> = {
  metamask: {
    name: 'MetaMask',
    icon: '/wallet-icons/metamask.svg',
    description: 'Connect with your MetaMask wallet',
  },
};