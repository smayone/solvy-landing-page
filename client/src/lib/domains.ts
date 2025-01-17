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
      rpcUrl: "https://rpc.solvy.chain",
      chainId: 985,  // SOLVY Chain ID
      explorerUrl: "https://explorer.solvy.chain"
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
  }
];

// DNS and Domain Resolution Configuration
export const domainConfig = {
  dns: {
    doh: 'https://dns.solvy.chain',  // DNS over HTTPS endpoint
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
export const isSolvyDomain = (domain: string): boolean => {
  return domain.endsWith('.solvy.chain') || domain === 'solvy.chain';
};

// Get domain configuration for the current hostname
export const getCurrentDomainConfig = (hostname: string): Domain | null => {
  if (!hostname) return null;
  return solvyDomains.find(config => config.domain === hostname) || null;
};

// Export DNS configuration
export const getDNSConfig = () => domainConfig.dns;