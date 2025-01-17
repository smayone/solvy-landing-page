import { ethers } from 'ethers';

// SOLVY Chain Configuration
export const SOLVY_CHAIN_CONFIG = {
  chainId: '0x3d9', // 985 in lowercase hex, matching MetaMask's format
  chainName: 'SOLVY Chain',
  nativeCurrency: {
    name: 'SOLVY',
    symbol: 'SLVY',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.solvy.chain'],
  blockExplorerUrls: ['https://explorer.solvy.chain'],
};

// Simple delay function for retry logic
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// MetaMask detection with detailed error
const detectMetaMask = () => {
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error('No Web3 wallet found. Please install MetaMask to connect to SOLVY Chain.');
  }
  if (!ethereum.isMetaMask) {
    throw new Error('Please use MetaMask for optimal compatibility with SOLVY Chain.');
  }
  return ethereum;
};

// Request account access with error handling
const connectWallet = async (ethereum: any) => {
  try {
    console.log('Requesting account access...');
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts available. Please unlock your MetaMask wallet.');
    }

    console.log('Account connected:', accounts[0]);
    return accounts[0];
  } catch (error: any) {
    console.error('Connect wallet error:', error);
    if (error.code === 4001) {
      throw new Error('Connection rejected. Please approve the connection request in MetaMask.');
    }
    throw error;
  }
};

// Validate chain ID
const validateChainId = async (ethereum: any) => {
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  console.log('Current chain ID:', chainId);
  return chainId.toLowerCase() === SOLVY_CHAIN_CONFIG.chainId.toLowerCase();
};

// Add SOLVY Chain network
const addNetwork = async (ethereum: any) => {
  try {
    console.log('Adding SOLVY Chain to MetaMask...');
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [SOLVY_CHAIN_CONFIG],
    });
    console.log('SOLVY Chain network added successfully');
  } catch (error: any) {
    console.error('Add network error:', error);
    // Don't throw if chain already exists
    if (!error.message.includes('already exists')) {
      throw new Error('Failed to add SOLVY Chain to MetaMask. Please try again.');
    }
  }
};

// Switch to SOLVY Chain
const switchNetwork = async (ethereum: any) => {
  try {
    console.log('Checking current chain...');
    const isCorrectChain = await validateChainId(ethereum);

    if (isCorrectChain) {
      console.log('Already on SOLVY Chain');
      return;
    }

    console.log('Switching to SOLVY Chain...');
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SOLVY_CHAIN_CONFIG.chainId }],
    });
    console.log('Successfully switched to SOLVY Chain');
  } catch (error: any) {
    console.error('Switch network error:', error);
    if (error.code === 4902) {
      console.log('Chain not found, attempting to add...');
      await addNetwork(ethereum);
      // Retry switch after adding
      console.log('Retrying network switch...');
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SOLVY_CHAIN_CONFIG.chainId }],
      });
    } else {
      throw new Error('Failed to switch to SOLVY Chain. Please try again.');
    }
  }
};

// Setup Web3 provider with retries
export const setupWeb3Provider = async (retryAttempts = 3) => {
  let lastError;

  for (let attempt = 1; attempt <= retryAttempts; attempt++) {
    try {
      console.log(`Attempt ${attempt} to connect to Web3...`);

      const ethereum = detectMetaMask();
      const account = await connectWallet(ethereum);
      await switchNetwork(ethereum);

      const provider = new ethers.providers.Web3Provider(ethereum);
      console.log('Web3 connection successful:', { 
        account,
        chainId: await provider.getNetwork().then(n => n.chainId)
      });

      return provider;
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt < retryAttempts) {
        const backoffTime = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${backoffTime/1000} seconds...`);
        await delay(backoffTime);
      }
    }
  }

  throw lastError;
};

// Get Web3 provider with fallback
export const getWeb3Provider = () => {
  try {
    const ethereum = detectMetaMask();
    return new ethers.providers.Web3Provider(ethereum);
  } catch (error) {
    console.warn('Falling back to read-only provider');
    return new ethers.providers.JsonRpcProvider(SOLVY_CHAIN_CONFIG.rpcUrls[0]);
  }
};