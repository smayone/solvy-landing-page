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

// Domain resolution helper
export const resolveDomain = (hostname: string): string | null => {
  // In development, allow all hostnames
  if (process.env.NODE_ENV !== 'production') {
    return domains.root;
  }

  // Default to root domain if no hostname
  if (!hostname) return domains.root;

  // Check if it's a valid SOLVY chain domain
  if (!hostname.endsWith('.solvy.chain') && hostname !== 'solvy.chain') {
    return null;
  }

  // Check if it's a known subdomain
  const subdomain = Object.values(domains.subdomains).find(
    config => config.domain === hostname
  );

  return subdomain?.domain || domains.root;
};

// DNS configuration helper
export const getDNSConfig = () => domains.dns;