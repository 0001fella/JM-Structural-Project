module.exports = {
  currency: 'KES',
  materials: {
    concrete: { unit: 'm³', unitPrice: 15000 },
    steel: { unit: 'kg', unitPrice: 250 },
    bricks: { unit: 'unit', unitPrice: 50 },
    sand: { unit: 'ton', unitPrice: 3000 },
    cement: { unit: 'bag', unitPrice: 800 },
    roofing: { unit: 'm²', unitPrice: 3500 },
    glass: { unit: 'm²', unitPrice: 4500 },
    timber: { unit: 'm³', unitPrice: 18000 }
  },
  laborRates: {
    skilled: 1200,
    unskilled: 600,
    mason: 1500,
    carpenter: 1400,
    electrician: 1600
  },
  equipmentRates: {
    excavator: 15000,
    crane: 25000,
    mixer: 8000
  },
  taxes: {
    vat: 0.16,
    withholding: 0.05
  }
};