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
    domain: "solvy.solvy.chain",
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
  },
  {
    name: "EBL",
    domain: "ebl.solvy.chain",
    description: "Electronic banking and financial services",
    registrationDate: "2025-01-06"
  },
  {
    name: "Remittance",
    domain: "remittance.solvy.chain",
    description: "Cross-border payment and remittance services",
    registrationDate: "2025-01-06"
  },
  {
    name: "Management",
    domain: "man.solvy.chain",
    description: "Platform management and administration",
    registrationDate: "2025-01-06"
  }
];

export const getDomainConfig = (host: string) => {
  if (!host) return null;

  const subdomain = solvyDomains.find(
    config => config.domain === host
  );

  return subdomain || null;
};

export const domains = {
  dns: {
    doh: 'https://dns.solvy.chain',  // Updated to SOLVY chain DNS
    ipv4: [
      '34.154.40.173',
      '34.154.254.177'
    ]
  }
};

// Web3 domain resolution helpers
export const getChainConfig = (domain: string) => {
  const config = solvyDomains.find(d => d.domain === domain);
  return config?.chainConfig;
};

export const isWeb3Domain = (domain: string) => {
  return domain.endsWith('.chain');
};