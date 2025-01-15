import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
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
    return new Web3(window.ethereum);
  }
  return null;
};

export const getPolygonNetwork = async () => {
  const web3 = setupWeb3();
  if (!web3) return null;

  try {
    const networkId = await web3.eth.net.getId();
    return networkId === BigInt(137) ? 'Polygon Mainnet' : 'Wrong Network';
  } catch (error) {
    console.error('Error getting network:', error);
    return null;
  }
};