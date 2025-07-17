import React, { useState, useEffect } from 'react';
import MaterialTable from './MaterialTable';
import ProfitCalculator from './ProfitCalculator';
import { motion } from 'framer-motion';
import { FaSave, FaGlobe, FaPlus, FaChartBar } from 'react-icons/fa';

const QuotationEditor = ({ aiResults }) => {
  const [quotation, setQuotation] = useState(null);
  const [profitMargin, setProfitMargin] = useState(15);
  const [region, setRegion] = useState('us-east');
  const [activeTab, setActiveTab] = useState('materials');

  useEffect(() => {
    if (aiResults) {
      const initialQuotation = {
        materials: aiResults.dimensions.materials.map(item => ({
          id: Math.random().toString(36).substr(2, 9),
          name: item.name,
          category: item.category || 'General',
          quantity: item.quantity,
          unit: item.unit,
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
      'Wood': 8.5,
      'Drywall': 1.2,
      'Insulation': 0.8,
      'Electrical Wiring': 2.3,
      'Plumbing Pipes': 3.1
    };
    return rates[material] || 0;
  };

  const getRegionMultiplier = (region, material) => {
    // Simplified regional pricing adjustments
    const regionFactors = {
      'us-east': 1.0,
      'us-west': 1.15,
      'eu': 1.2,
      'asia': 0.9,
      'africa': 0.85
    };
    return regionFactors[region] || 1.0;
  };

  const calculateLabor = (area) => {
    const laborCostPerSqFt = 35;
    return [
      { id: 'l1', name: 'Construction Labor', quantity: area, unit: 'sq ft', rate: laborCostPerSqFt },
      { id: 'l2', name: 'Electrical', quantity: area * 0.3, unit: 'sq ft', rate: 12 },
      { id: 'l3', name: 'Plumbing', quantity: area * 0.25, unit: 'sq ft', rate: 15 },
      { id: 'l4', name: 'HVAC', quantity: area * 0.2, unit: 'sq ft', rate: 18 }
    ];
  };

  const handleMaterialChange = (id, field, value) => {
    const updatedMaterials = quotation.materials.map(material => {
      if (material.id === id) {
        return { ...material, [field]: value };
      }
      return material;
    });
    
    setQuotation({
      ...quotation,
      materials: updatedMaterials
    });
  };

  const materialColumns = [
    {
      accessorKey: 'name',
      header: 'Material',
      meta: { width: '30%' },
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <input
          type="number"
          min="0"
          step="0.01"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          value={row.original.quantity}
          onChange={(e) => handleMaterialChange(row.original.id, 'quantity', Number(e.target.value))}
        />
      )
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
      meta: { width: '15%' }
    },
    {
      accessorKey: 'unitRate',
      header: 'Unit Rate ($)',
      cell: ({ row }) => (
        <input
          type="number"
          min="0"
          step="0.01"
          className="w-full py-1 px-2 border border-gray-300 rounded"
          value={row.original.unitRate}
          onChange={(e) => handleMaterialChange(row.original.id, 'unitRate', Number(e.target.value))}
        />
      )
    },
    {
      accessorKey: 'total',
      header: 'Total ($)',
      cell: ({ row }) => (
        <span className="font-medium">
          {(row.original.quantity * row.original.unitRate).toLocaleString(undefined, {maximumFractionDigits:2})}
        </span>
      )
    }
  ];

  const laborColumns = [
    {
      accessorKey: 'name',
      header: 'Labor Type',
      meta: { width: '40%' }
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      meta: { width: '20%' }
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
      meta: { width: '15%' }
    },
    {
      accessorKey: 'rate',
      header: 'Rate ($)',
      meta: { width: '15%' }
    },
    {
      accessorKey: 'total',
      header: 'Total ($)',
      cell: ({ row }) => (
        <span className="font-medium">
          {(row.original.quantity * row.original.rate).toLocaleString(undefined, {maximumFractionDigits:2})}
        </span>
      )
    }
  ];

  if (!quotation) return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-center">
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-16 h-16 flex items-center justify-center mb-4">
        <FaChartBar className="text-gray-400 text-2xl" />
      </div>
      <p className="text-gray-500 text-center mb-6">
        Upload a blueprint to start editing your quotation
      </p>
      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all">
        Upload Blueprint
      </button>
    </div>
  );

  const materialsTotal = quotation.materials.reduce(
    (sum, item) => sum + (item.quantity * item.unitRate), 
    0
  );
  
  const laborTotal = quotation.labor.reduce(
    (sum, item) => sum + (item.quantity * item.rate), 
    0
  );
  
  const baseTotal = materialsTotal + laborTotal;
  const profitAmount = baseTotal * (profitMargin / 100);
  const contractSum = baseTotal + profitAmount;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Quotation Editor</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-800/30 text-white px-4 py-1.5 rounded-lg flex items-center">
            <FaSave className="mr-2" />
            Save
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="md:w-1/3">
            <ProfitCalculator 
              profitMargin={profitMargin} 
              setProfitMargin={setProfitMargin} 
              baseCost={baseTotal}
            />
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Regional Pricing</h3>
                <div className="flex items-center">
                  <FaGlobe className="text-gray-500 mr-2" />
                  <select 
                    className="border border-gray-300 rounded-lg px-3 py-1.5 bg-white"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="us-east">US East</option>
                    <option value="us-west">US West</option>
                    <option value="eu">European Union</option>
                    <option value="asia">Asia Pacific</option>
                    <option value="africa">Africa</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Materials Total</p>
                    <p className="font-bold text-lg text-blue-700">${materialsTotal.toLocaleString()}</p>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Labor Total</p>
                    <p className="font-bold text-lg text-cyan-700">${laborTotal.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Base Cost</p>
                    <p className="font-bold text-lg text-gray-800">${baseTotal.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Profit ({profitMargin}%)</p>
                    <p className="font-bold text-lg text-green-700">${profitAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 font-medium relative ${
                activeTab === 'materials' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('materials')}
            >
              Materials
            </button>
            <button
              className={`px-4 py-2 font-medium relative ${
                activeTab === 'labor' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('labor')}
            >
              Labor
            </button>
          </div>
        </div>
        
        {activeTab === 'materials' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Material Costs</h3>
              <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg flex items-center text-sm">
                <FaPlus className="mr-1" />
                Add Material
              </button>
            </div>
            <MaterialTable 
              columns={materialColumns}
              data={quotation.materials}
            />
          </div>
        )}
        
        {activeTab === 'labor' && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Labor Costs</h3>
            <MaterialTable 
              columns={laborColumns}
              data={quotation.labor}
              readOnly
            />
          </div>
        )}
        
        <div className="mt-8 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Contract Sum</p>
              <p className="text-2xl font-bold text-blue-700">${contractSum.toLocaleString()}</p>
            </div>
            <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all">
              Generate Quotation
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuotationEditor;