import React, { useState } from 'react';
import { FaInfoCircle, FaPercentage, FaCalculator } from 'react-icons/fa';

const ProfitCalculator = ({ baseCost, onTotalUpdate }) => {
  const [profitMargin, setProfitMargin] = useState(15);
  const [overhead, setOverhead] = useState(8);
  const [includeOverhead, setIncludeOverhead] = useState(true);

  // Calculate all values with commercial precision
  const calculateValues = () => {
    const overheadAmount = includeOverhead ? baseCost * (overhead / 100) : 0;
    const profitAmount = baseCost * (profitMargin / 100);
    const subtotal = baseCost + overheadAmount;
    const total = subtotal + profitAmount;
    
    return {
      overheadAmount,
      profitAmount,
      subtotal,
      total
    };
  };

  const { overheadAmount, profitAmount, subtotal, total } = calculateValues();

  // Format currency with construction industry standards
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4 text-gray-700">
        <FaCalculator className="mr-2 text-blue-600" />
        <h3 className="text-lg font-bold">Commercial Margin Calculator</h3>
        <div className="ml-auto flex items-center">
          <span 
            className="text-xs text-gray-500 cursor-help mr-2 flex items-center"
            title="Toggle overhead inclusion"
          >
            <input
              type="checkbox"
              checked={includeOverhead}
              onChange={() => setIncludeOverhead(!includeOverhead)}
              className="mr-1 h-4 w-4 text-blue-600"
            />
            Include OH
          </span>
          <FaInfoCircle 
            className="text-gray-400 cursor-help" 
            title="Profit calculated on base cost + overhead" 
          />
        </div>
      </div>

      {/* Overhead Control */}
      {includeOverhead && (
        <div className="mb-5">
          <div className="flex justify-between mb-2">
            <label className="font-medium text-gray-700 flex items-center">
              Overhead Percentage
            </label>
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                max="50"
                step="0.25"
                className="w-24 input-field border border-gray-300 rounded px-2 py-1 text-right"
                value={overhead}
                onChange={(e) => setOverhead(Number(e.target.value))}
              />
              <FaPercentage className="ml-1 text-gray-500" size={12} />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="0.25"
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            value={overhead}
            onChange={(e) => setOverhead(Number(e.target.value))}
          />
        </div>
      )}

      {/* Profit Margin Control */}
      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <label className="font-medium text-gray-700">Profit Margin</label>
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              step="0.25"
              className="w-24 input-field border border-gray-300 rounded px-2 py-1 text-right"
              value={profitMargin}
              onChange={(e) => setProfitMargin(Number(e.target.value))}
            />
            <FaPercentage className="ml-1 text-gray-500" size={12} />
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="0.25"
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          value={profitMargin}
          onChange={(e) => setProfitMargin(Number(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0%</span>
          <span>10%</span>
          <span>20%</span>
          <span>30%</span>
          <span>40%</span>
          <span>50%</span>
        </div>
      </div>

      {/* Calculation Breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="text-gray-600">Base Cost:</div>
          <div className="text-right font-mono">{formatCurrency(baseCost)}</div>
          
          {includeOverhead && (
            <>
              <div className="text-gray-600 flex items-center">
                Overhead ({overhead}%):
              </div>
              <div className="text-right font-mono">{formatCurrency(overheadAmount)}</div>
              
              <div className="text-gray-600">Subtotal:</div>
              <div className="text-right font-mono">{formatCurrency(subtotal)}</div>
            </>
          )}
          
          <div className="text-gray-600 flex items-center">
            Profit ({profitMargin}%):
          </div>
          <div className="text-right font-mono">{formatCurrency(profitAmount)}</div>
          
          <div className="col-span-2 border-t border-gray-300 my-2 pt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-800">Contract Sum:</span>
              <span className="text-right font-mono text-blue-700">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <div className="text-gray-600">
          Margin: {profitMargin}% | OH: {includeOverhead ? `${overhead}%` : 'Excluded'}
        </div>
        <div className="font-bold text-lg text-blue-800">
          {formatCurrency(total)}
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;