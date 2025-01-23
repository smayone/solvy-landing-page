import { ethers } from 'ethers';

interface DomainInfo {
  name: string;
  resolution: string;
  owner: string;
  expiry: number;
}

interface NFTMetadata {
  tokenId: string;
  owner: string;
  domain: string;
  expiration: number;
}

export class Web3DomainResolver {
  private provider: ethers.providers.Provider;
  private apiKey: string;
  private baseURL = 'https://api.freename.io';
  private web3ExplorerURL = 'https://freename-web3-explorer.freename-workers.workers.dev/api';

  constructor() {
    // Connect to Polygon mainnet using environment variable or fallback
    const rpcUrl = import.meta.env.VITE_RPC_URL || 'https://polygon-rpc.com';
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.apiKey = import.meta.env.VITE_FREENAME_API_KEY || '';

    // Log initialization status
    if (!this.apiKey) {
      console.warn('[Web3DomainResolver] No Freename API key provided. Some features may be limited.');
    }
    console.log('[Web3DomainResolver] Initialized with RPC URL:', rpcUrl);
  }

  async resolveDomain(domain: string): Promise<string | null> {
    try {
      console.log(`[Web3DomainResolver] Resolving domain: ${domain}`);

      // First try Web3 Explorer API
      const nftData = await this.fetchNFTData(domain);
      if (nftData && nftData.domain === domain) {
        console.log(`[Web3DomainResolver] Found NFT data for domain: ${domain}`, nftData);

        if (!this.apiKey) {
          console.warn('[Web3DomainResolver] Skipping resolution API call - No API key available');
          return null;
        }

        // If we found the NFT, use the resolution API to get the DNS records
        const response = await fetch(`${this.baseURL}/v1/resolution/resolve`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            domain,
            type: 'dns_a'
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.records && data.records.length > 0) {
          console.log(`[Web3DomainResolver] Resolved domain ${domain} to:`, data.records[0].content);
          return data.records[0].content;
        }
      }
      return null;
    } catch (error) {
      console.error('[Web3DomainResolver] Error resolving domain:', error);
      return null;
    }
  }

  async fetchNFTData(domain: string): Promise<NFTMetadata | null> {
    try {
      console.log(`[Web3DomainResolver] Fetching NFT data for domain: ${domain}`);
      const encodedDomain = encodeURIComponent(domain);
      const response = await fetch(`${this.web3ExplorerURL}/fetch-nft/${encodedDomain}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.tokenId) {
        console.log(`[Web3DomainResolver] Found NFT data:`, data);
        return {
          tokenId: data.tokenId,
          owner: data.owner,
          domain: data.domain,
          expiration: data.expiration
        };
      }
      return null;
    } catch (error) {
      console.error('[Web3DomainResolver] Error fetching NFT data:', error);
      return null;
    }
  }

  async getDomainInfo(domain: string): Promise<DomainInfo | null> {
    try {
      // First try to get NFT data
      const nftData = await this.fetchNFTData(domain);
      if (nftData) {
        return {
          name: nftData.domain,
          resolution: await this.resolveDomain(domain) || '',
          owner: nftData.owner,
          expiry: nftData.expiration,
        };
      }

      if (!this.apiKey) {
        console.warn('[Web3DomainResolver] Skipping domain info API call - No API key available');
        return null;
      }

      // Fallback to regular API if NFT data not found
      const response = await fetch(`${this.baseURL}/v1/domain/${encodeURIComponent(domain)}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        return {
          name: data.domain,
          resolution: data.resolution || '',
          owner: data.owner || '',
          expiry: data.expiry || 0,
        };
      }
      return null;
    } catch (error) {
      console.error('[Web3DomainResolver] Error getting domain info:', error);
      return null;
    }
  }

  async isValidSolvyDomain(domain: string): Promise<boolean> {
    if (!domain.endsWith('.solvy.chain')) {
      return false;
    }

    const domainInfo = await this.getDomainInfo(domain);
    return !!domainInfo && !!domainInfo.resolution;
  }
}

export const web3DomainResolver = new Web3DomainResolver();