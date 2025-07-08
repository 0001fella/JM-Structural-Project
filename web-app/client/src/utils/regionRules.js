// Sample regional pricing rules
export const regionRules = {
  'us-east': {
    name: 'US East Coast',
    multiplier: 1.0,
    adjustments: {
      'Concrete': 1.05,
      'Steel': 1.02,
      'Labor': 1.1
    },
    taxes: 0.07,
    currency: 'USD'
  },
  'us-west': {
    name: 'US West Coast',
    multiplier: 1.15,
    adjustments: {
      'Concrete': 1.08,
      'Steel': 1.05,
      'Labor': 1.2
    },
    taxes: 0.085,
    currency: 'USD'
  },
  'eu': {
    name: 'European Union',
    multiplier: 1.2,
    adjustments: {
      'Concrete': 1.1,
      'Steel': 1.07,
      'Labor': 1.15
    },
    taxes: 0.21,
    currency: 'EUR'
  },
  'asia': {
    name: 'Asia Pacific',
    multiplier: 0.9,
    adjustments: {
      'Concrete': 0.95,
      'Steel': 0.92,
      'Labor': 0.85
    },
    taxes: 0.05,
    currency: 'USD'
  }
};

export const getRegionName = (code) => {
  return regionRules[code]?.name || 'Unknown Region';
};