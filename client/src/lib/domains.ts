// Domain configuration for solvy.chain ecosystem
export const domains = {
  root: 'solvy.chain',
  subdomains: {
    education: {
      domain: 'education.solvy.chain',
      description: 'Educational platform for blockchain and financial literacy',
      registrar: 'Freename',
      registrationDate: '2025-01-06',
      registrant: 'Sean Mayo'
    },
    decidey: {
      domain: 'decidey.solvy.chain',
      description: 'Decentralized Empowerment Control Identity Data Economy of Yours',
      registrar: 'Freename',
      registrationDate: '2025-01-06',
      registrant: 'Sean Mayo'
    },
    solvy: {
      domain: 'solvy.solvy.chain',
      description: 'Core SOLVY platform services and financial solutions',
      registrar: 'Freename',
      registrationDate: '2025-01-06',
      registrant: 'Sean Mayo'
    },
    business: {
      domain: 'business.solvy.chain',
      description: 'Business services and blockchain solutions',
      registrar: 'Freename',
      registrationDate: '2025-01-06',
      registrant: 'Sean Mayo'
    },
    ebl: {
      domain: 'ebl.solvy.chain',
      description: 'Evergreen Beauty Lounge services',
      registrar: 'Freename',
      registrationDate: '2025-01-06',
      registrant: 'Sean Mayo'
    },
    remittance: {
      domain: 'remittance.solvy.chain',
      description: 'Cross-border payment and remittance services',
      registrar: 'Freename',
      registrationDate: '2025-01-06',
      registrant: 'Sean Mayo'
    },
    man: {
      domain: 'man.solvy.chain',
      description: 'Mandatory Audit Network',
      registrar: 'Freename',
      registrationDate: '2025-01-06',
      registrant: 'Sean Mayo'
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