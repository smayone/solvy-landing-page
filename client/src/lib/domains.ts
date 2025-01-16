// Domain configuration for solvy.chain ecosystem
export const domains = {
  root: 'solvy.chain',
  subdomains: {
    education: {
      domain: 'education.solvy.chain',
      description: 'Educational platform for blockchain and financial literacy'
    },
    decidey: {
      domain: 'decidey.solvy.chain',
      description: 'Decentralized decision-making platform'
    },
    solvy: {
      domain: 'solvy.solvy.chain',
      description: 'Core SOLVY platform services'
    },
    business: {
      domain: 'business.solvy.chain',
      description: 'Business services and solutions'
    },
    ebl: {
      domain: 'ebl.solvy.chain',
      description: 'Evergreen Beauty Lounge services'
    },
    remittance: {
      domain: 'remittance.solvy.chain',
      description: 'Cross-border payment and remittance services'
    },
    man: {
      domain: 'man.solvy.chain',
      description: 'Mandatory Audit Network'
    }
  },
  dns: {
    doh: 'https://dns1.noto.network',
    ipv4: [
      '34.154.40.173',
      '34.154.254.177'
    ]
  }
};

export const getDomainConfig = (host: string) => {
  if (!host) return null;
  
  const subdomain = Object.values(domains.subdomains).find(
    config => config.domain === host
  );
  
  return subdomain || null;
};
