export const regionRules = {
  'us-east': {
    name: 'US East Coast',
    multiplier: 1.0,
    adjustments: {
      'Concrete': 1.05,
      'Steel': 1.02,
      'Labor': 1.1
    },
    taxes: 0.07
  },
  'us-west': {
    name: 'US West Coast',
    multiplier: 1.15,
    adjustments: {
      'Concrete': 1.08,
      'Steel': 1.05,
      'Labor': 1.2
    },
    taxes: 0.085
  },
  'eu': {
    name: 'European Union',
    multiplier: 1.2,
    adjustments: {
      'Concrete': 1.1,
      'Steel': 1.07,
      'Labor': 1.15
    },
    taxes: 0.21
  },
  'asia': {
    name: 'Asia Pacific',
    multiplier: 0.9,
    adjustments: {
      'Concrete': 0.95,
      'Steel': 0.92,
      'Labor': 0.85
    },
    taxes: 0.05
  }
};

export const applyRegionalPricing = (materials, regionCode) => {
  const region = regionRules[regionCode] || regionRules['us-east'];
  
  return materials.map(item => {
    const baseRate = getBaseRate(item.name);
    const adjustedRate = baseRate * region.multiplier * (region.adjustments[item.name] || 1);
    
    return {
      ...item,
      unitRate: adjustedRate,
      total: item.quantity * adjustedRate
    };
  });
};

function getBaseRate(material) {
  const rates = {
    'Concrete': 120,
    'Bricks': 0.75,
    'Steel': 2.5,
    'Glass': 45,
    'Wood': 8.5
  };
  return rates[material] || 0;
}