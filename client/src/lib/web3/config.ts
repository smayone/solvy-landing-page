import { ethers } from 'ethers';

// Fallback RPC URL if environment variable is not set
const DEFAULT_RPC_URL = 'https://rpc.solvy.chain';

// SOLVY Chain Configuration
export const SOLVY_CHAIN_CONFIG = {
  chainId: '0x3d9', // 985 in hex
  chainName: 'SOLVY Chain',
  nativeCurrency: {
    name: 'SOLVY',
    symbol: 'SLVY',
    decimals: 18,
  },
  rpcUrls: [process.env.RPC_URL || DEFAULT_RPC_URL],
  blockExplorerUrls: ['https://explorer.solvy.chain'],
};

// Setup Web3 provider with proper error handling and fallback
export const setupWeb3Provider = async () => {
  if (typeof window === 'undefined') {
    // Server-side rendering or non-browser environment
    return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
  }

  if (typeof window.ethereum === 'undefined') {
    // No MetaMask installed, use read-only provider
    return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request account access
    await provider.send("eth_requestAccounts", []);

    // Switch to SOLVY chain
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SOLVY_CHAIN_CONFIG.chainId }],
      });
    } catch (switchError: any) {
      // Chain hasn't been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SOLVY_CHAIN_CONFIG],
          });
        } catch (addError) {
          console.error('Failed to add SOLVY chain:', addError);
          // Fall back to read-only provider
          return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
        }
      } else {
        console.error('Failed to switch to SOLVY chain:', switchError);
        // Fall back to read-only provider
        return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
      }
    }

    return provider;
  } catch (error: any) {
    console.error('Failed to initialize Web3:', error);
    // Fall back to read-only provider
    return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
  }
};