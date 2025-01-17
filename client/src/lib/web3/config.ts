import { ethers } from 'ethers';

// SOLVY Chain Configuration
export const SOLVY_CHAIN_CONFIG = {
  chainId: '0x3d9', // 985 in lowercase hex
  chainName: 'SOLVY Chain',
  nativeCurrency: {
    name: 'SOLVY',
    symbol: 'SLVY',
    decimals: 18,
  },
  rpcUrls: [process.env.RPC_URL || 'https://rpc.solvy.chain'],
  blockExplorerUrls: ['https://explorer.solvy.chain'],
};

// Get Web3 provider with fallback
export const setupWeb3Provider = async () => {
  // For development without MetaMask, return a read-only provider
  if (typeof window.ethereum === 'undefined') {
    console.log('MetaMask not found, using read-only provider');
    return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } catch (error) {
    console.warn('Web3 initialization failed, using read-only provider');
    return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
  }
};