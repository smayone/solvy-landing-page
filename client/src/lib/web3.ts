import { ethers } from 'ethers';

// Polygon Network ID
export const CHAIN_ID = 137;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('Please install MetaMask or another Web3 wallet');
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const network = await provider.getNetwork();
    if (network.chainId !== CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
        });
      } catch (error: any) {
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${CHAIN_ID.toString(16)}`,
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://polygon-rpc.com'],
              blockExplorerUrls: ['https://polygonscan.com/']
            }]
          });
        } else {
          throw error;
        }
      }
    }

    return provider;
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
}

export const getSolvyChainStatus = async () => {
  if (typeof window.ethereum === 'undefined') {
    return {
      isConnected: false,
      chainName: 'No Wallet'
    };
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    const isConnectedToPolygon = network.chainId === CHAIN_ID;

    return {
      isConnected: isConnectedToPolygon,
      chainName: isConnectedToPolygon ? 'SOLVY Chain (Polygon)' : 'Wrong Network'
    };
  } catch (error) {
    console.error('Error getting chain status:', error);
    return null;
  }
};