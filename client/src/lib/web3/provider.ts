import { ethers } from 'ethers';
import { solvyDomains } from '../domains';

const POLYGON_CHAIN_ID = 137;

export class Web3Provider {
  private provider: ethers.providers.Web3Provider | null = null;
  private networkChecked: boolean = false;

  async initialize(): Promise<boolean> {
    if (typeof window === 'undefined' || !window.ethereum) {
      console.error('Web3 provider not found. Please install MetaMask.');
      return false;
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      this.provider = new ethers.providers.Web3Provider(window.ethereum);

      // Check if we're on the correct network
      const network = await this.provider.getNetwork();
      if (network.chainId !== POLYGON_CHAIN_ID) {
        const mainConfig = solvyDomains.find(d => d.name === "SOLVY Main")?.chainConfig;
        if (mainConfig) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${POLYGON_CHAIN_ID.toString(16)}` }]
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: `0x${POLYGON_CHAIN_ID.toString(16)}`,
                    chainName: 'Polygon Mainnet',
                    nativeCurrency: {
                      name: 'MATIC',
                      symbol: 'MATIC',
                      decimals: 18
                    },
                    rpcUrls: [import.meta.env.VITE_RPC_URL || mainConfig.rpcUrl],
                    blockExplorerUrls: [mainConfig.explorerUrl]
                  }]
                });
              } catch (error) {
                console.error('Failed to add Polygon network:', error);
                return false;
              }
            } else {
              console.error('Failed to switch to Polygon network:', switchError);
              return false;
            }
          }
        }
      }

      this.networkChecked = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Web3 provider:', error);
      return false;
    }
  }

  getProvider(): ethers.providers.Web3Provider | null {
    return this.provider;
  }

  isInitialized(): boolean {
    return this.networkChecked && this.provider !== null;
  }
}

export const web3Provider = new Web3Provider();