import { ethers } from 'ethers';
import { getChainConfig } from '../domains';

export const SOLVY_CHAIN_CONFIG = {
  chainId: '0x3D9', // 985 in hex
  chainName: 'SOLVY Chain',
  nativeCurrency: {
    name: 'SOLVY',
    symbol: 'SLVY',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.solvy.chain'],
  blockExplorerUrls: ['https://explorer.solvy.chain'],
};

export const setupWeb3Provider = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Please install a Web3 wallet like MetaMask to connect to SOLVY Chain');
  }

  try {
    // Request account access if needed
    await window.ethereum.request({ 
      method: 'eth_requestAccounts',
      params: [] 
    });

    // Add the SOLVY Chain network to MetaMask
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [SOLVY_CHAIN_CONFIG],
      });
    } catch (addError: any) {
      // If the chain is already added, this error is expected
      if (!addError.message.includes('already exists')) {
        throw addError;
      }
    }

    // Try to switch to SOLVY Chain
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SOLVY_CHAIN_CONFIG.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        throw new Error('Please add the SOLVY Chain network to your wallet');
      }
      throw switchError;
    }

    // Create Web3 provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } catch (error: any) {
    console.error('Failed to setup Web3 provider:', error);
    throw new Error(error.message || 'Failed to connect to SOLVY Chain');
  }
};

export const getWeb3Provider = () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    // Fallback to read-only provider
    return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
  }

  const domain = window.location.hostname;
  const chainConfig = getChainConfig(domain);

  if (!chainConfig) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }

  return new ethers.providers.Web3Provider(window.ethereum);
};