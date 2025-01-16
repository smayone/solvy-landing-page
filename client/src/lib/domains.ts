// Domain configuration for solvy.chain ecosystem
export interface Domain {
  name: string;
  domain: string;
  description: string;
  registrationDate: string;
}

export const solvyDomains: Domain[] = [
  {
    name: "SOLVY Main",
    domain: "solvy.solvy.chain",
    description: "Main platform for SOLVY financial solutions",
    registrationDate: "2025-01-06"
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
    name: "Decidey",
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
    doh: 'https://dns1.noto.network',
    ipv4: [
      '34.154.40.173',
      '34.154.254.177'
    ]
  }
};