import React, { useState } from 'react';
import { FaPercentage, FaInfoCircle, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Profit Calculator</h2>
        <div className="bg-blue-800/30 rounded-full p-2">
          <FaChartLine className="text-white text-lg" />
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
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

        <div className="mb-6 flex items-center justify-between">
          <div>
            <label className="font-medium text-gray-700 flex items-center">
              Include Overhead
              <FaInfoCircle className="ml-2 text-gray-400" title="Overhead costs include administrative expenses" />
            </label>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={includeOverhead}
              onChange={() => setIncludeOverhead(!includeOverhead)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {includeOverhead && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="font-medium text-gray-700">Overhead Percentage</label>
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
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={overhead}
              onChange={(e) => setOverhead(Number(e.target.value))}
            />
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <div className="text-gray-600">Base Cost:</div>
              <div className="font-medium">{formatCurrency(baseCost)}</div>
            </div>
            
            {includeOverhead && (
              <>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">Overhead ({overhead}%):</div>
                  <div className="font-medium">{formatCurrency(overheadAmount)}</div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <div className="text-gray-600">Subtotal:</div>
                  <div className="font-medium">{formatCurrency(subtotal)}</div>
                </div>
              </>
            )}
            
            <div className="flex justify-between items-center">
              <div className="text-gray-600">Profit ({profitMargin}%):</div>
              <div className="font-medium">{formatCurrency(profitAmount)}</div>
            </div>
            
            <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-300">
              <div className="font-semibold text-gray-800">Contract Sum:</div>
              <div className="font-bold text-xl text-blue-700">
                {formatCurrency(total)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-center">
          <FaMoneyBillWave className="text-blue-600 text-xl mr-3" />
          <p className="text-blue-700">
            Increasing profit margin by 5% would add {formatCurrency(baseCost * 0.05)} to your contract sum
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfitCalculator;