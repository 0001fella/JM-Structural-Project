export const calculateMaterialCost = (materials) => {
  return materials.reduce((total, item) => {
    return total + (item.quantity * item.unitRate);
  }, 0);
};

export const calculateLaborCost = (laborItems) => {
  return laborItems.reduce((total, item) => {
    return total + (item.hours * item.ratePerHour);
  }, 0);
};

export const calculateTotalCost = (materials, labor, profitMargin = 15) => {
  const materialCost = calculateMaterialCost(materials);
  const laborCost = calculateLaborCost(labor);
  const subtotal = materialCost + laborCost;
  const profit = subtotal * (profitMargin / 100);
  return subtotal + profit;
};