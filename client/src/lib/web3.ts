import Web3 from 'web3';
import { domains, getDomainConfig } from './domains';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const SOLVY_CHAIN_ID = 137; // Polygon network ID
export const SOLVY_CHAIN_RPC = 'https://polygon-rpc.com'; // Default RPC endpoint

export const getSolvyDomainConfig = (host: string) => {
  const config = getDomainConfig(host);
  if (!config) {
    throw new Error('Invalid SOLVY domain');
  }
  return config;
};

export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Switch to Polygon network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${SOLVY_CHAIN_ID.toString(16)}` }],
        });
      } catch (switchError: any) {
        // If the chain hasn't been added to MetaMask
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${SOLVY_CHAIN_ID.toString(16)}`,
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: [SOLVY_CHAIN_RPC],
              blockExplorerUrls: ['https://polygonscan.com/']
            }]
          });
        }
      }

      return accounts[0];
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  } else {
    throw new Error('Please install MetaMask');
  }
};

export const setupWeb3 = () => {
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    return web3;
  }
  // Fallback to HTTP provider
  return new Web3(new Web3.providers.HttpProvider(SOLVY_CHAIN_RPC));
};

export const getCurrentDomain = () => {
  if (typeof window === 'undefined') return null;
  return window.location.hostname.split('.')[0] || null;
};

export const getSolvyChainStatus = async () => {
  const web3 = setupWeb3();
  if (!web3) return null;

  try {
    const networkId = await web3.eth.net.getId();
    const isConnectedToPolygon = networkId === BigInt(SOLVY_CHAIN_ID);
    const currentDomain = getCurrentDomain();
    const domainConfig = currentDomain ? getDomainConfig(`${currentDomain}.${domains.root}`) : null;

    return {
      isConnected: isConnectedToPolygon,
      networkId,
      currentDomain,
      domainConfig,
      chainName: isConnectedToPolygon ? 'SOLVY Chain (Polygon)' : 'Wrong Network'
    };
  } catch (error) {
    console.error('Error getting chain status:', error);
    return null;
  }
};