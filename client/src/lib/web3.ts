import { ethers } from 'ethers';
import { CHAIN_ID } from './connectors';

declare global {
  interface Window {
    ethereum?: any;
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