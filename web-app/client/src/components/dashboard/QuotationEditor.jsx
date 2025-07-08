import React, { useState, useEffect } from 'react';
import MaterialTable from './MaterialTable';
import ProfitCalculator from './ProfitCalculator';

const QuotationEditor = ({ aiResults }) => {
  const [quotation, setQuotation] = useState(null);
  const [profitMargin, setProfitMargin] = useState(15);
  const [region, setRegion] = useState('us-east');

  useEffect(() => {
    if (aiResults) {
      const initialQuotation = {
        materials: aiResults.dimensions.materials.map(item => ({
          ...item,
          unitRate: getBaseRate(item.name),
          regionMultiplier: getRegionMultiplier(region, item.name),
          profitMargin
        })),
        labor: calculateLabor(aiResults.dimensions.area),
        total: aiResults.costEstimate
      };
      setQuotation(initialQuotation);
    }
  }, [aiResults, region, profitMargin]);

  const getBaseRate = (material) => {
    const rates = {
      'Concrete': 120,
      'Bricks': 0.75,
      'Steel': 2.5,
      'Glass': 45,
      'Wood': 8.5
    };
    return rates[material] || 0;
  };

  const getRegionMultiplier = (region, material) => {
    // Simplified regional pricing adjustments
    const regionFactors = {
      'us-east': 1.0,
      'us-west': 1.15,
      'eu': 1.2,
      'asia': 0.9
    };
    return regionFactors[region] || 1.0;
  };

  const calculateLabor = (area) => {
    const laborCostPerSqFt = 35;
    return [
      { name: 'Construction Labor', quantity: area, unit: 'sq ft', rate: laborCostPerSqFt },
      { name: 'Electrical', quantity: area * 0.3, unit: 'sq ft', rate: 12 },
      { name: 'Plumbing', quantity: area * 0.25, unit: 'sq ft', rate: 15 }
    ];
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...quotation.materials];
    updatedMaterials[index][field] = value;
    
    // Recalculate totals if needed
    setQuotation({
      ...quotation,
      materials: updatedMaterials
    });
  };

  if (!quotation) return (
    <div className="dashboard-card">
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Upload a blueprint to start editing your quotation</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Edit Quotation</h2>
        <div className="flex space-x-4">
          <select 
            className="input-field w-40"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="us-east">US East</option>
            <option value="us-west">US West</option>
            <option value="eu">European Union</option>
            <option value="asia">Asia Pacific</option>
          </select>
          <button className="btn-primary">
            <i className="fas fa-save mr-2"></i> Save
          </button>
        </div>
      </div>

      <ProfitCalculator 
        profitMargin={profitMargin} 
        setProfitMargin={setProfitMargin} 
        baseCost={aiResults.costEstimate}
      />

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold mb-3">Materials</h3>
          <MaterialTable 
            items={quotation.materials} 
            onItemChange={handleMaterialChange} 
          />
        </div>
        <div>
          <h3 className="font-semibold mb-3">Labor</h3>
          <MaterialTable items={quotation.labor} readOnly />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-bold">Total Estimated Cost:</span>
          <span className="text-2xl font-bold text-primary">
            ${(quotation.total * (1 + profitMargin/100)).toLocaleString(undefined, {maximumFractionDigits:2})}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Base Cost: ${quotation.total.toLocaleString()}</span>
          <span>Profit Margin: {profitMargin}%</span>
        </div>
      </div>
    </div>
  );
};

export default QuotationEditor;