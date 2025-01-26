import { web3DomainResolver } from './web3/domain-resolver';

// Domain configuration for solvy.chain ecosystem
export interface Domain {
  name: string;
  domain: string;
  description: string;
  registrationDate: string;
  chainConfig?: {
    rpcUrl: string;
    chainId: number;
    explorerUrl: string;
  };
}

export const solvyDomains: Domain[] = [
  {
    name: "SOLVY Main",
    domain: "solvy.chain",
    description: "Main platform for SOLVY financial solutions",
    registrationDate: "2025-01-06",
    chainConfig: {
      rpcUrl: "https://polygon-rpc.com",
      chainId: 137,  // Polygon Mainnet
      explorerUrl: "https://polygonscan.com"
    }
  },
  {
    name: "Business",
    domain: "business.solvy.chain",
    description: "Enterprise solutions and business services",
    registrationDate: "2025-01-06"
  },
  {
    name: "Education",
    domain: "education.solvy.chain",
    description: "Educational resources and learning platform",
    registrationDate: "2025-01-06"
  },
  {
    name: "DECIDEY",
    domain: "decidey.solvy.chain",
    description: "Decision-making and governance platform",
    registrationDate: "2025-01-06"
  },
  {
    name: "EBL Reign",
    domain: "reign.solvy.chain",
    description: "Sustainable well-being products and services focused on women's health",
    registrationDate: "2025-01-26"
  }
];

// DNS and Domain Resolution Configuration
export const domainConfig = {
  dns: {
    doh: 'https://dns.freename.io',  // Freename DNS over HTTPS endpoint
    ipv4: [
      '127.0.0.1',  // Local development
      '34.154.40.173',  // Primary DNS
      '34.154.254.177'  // Secondary DNS
    ]
  },
  resolution: {
    ttl: 300,  // 5 minutes TTL for DNS records
    defaultRedirect: 'https://solvy.chain'
  }
};

// Helper function to check if a domain is a SOLVY chain domain
export const isSolvyDomain = async (domain: string): Promise<boolean> => {
  if (!domain.endsWith('.solvy.chain') && domain !== 'solvy.chain') {
    return false;
  }

  // In development, allow all SOLVY chain domains
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  return web3DomainResolver.isValidSolvyDomain(domain);
};

// Get domain configuration for the current hostname
export const getCurrentDomainConfig = async (hostname: string): Promise<Domain | null> => {
  if (!hostname) return null;

  // Verify domain resolution through Freename
  if (process.env.NODE_ENV === 'production') {
    const isValid = await web3DomainResolver.isValidSolvyDomain(hostname);
    if (!isValid) return null;
  }

  return solvyDomains.find(config => config.domain === hostname) || null;
};

// Export DNS configuration
export const getDNSConfig = () => domainConfig.dns;