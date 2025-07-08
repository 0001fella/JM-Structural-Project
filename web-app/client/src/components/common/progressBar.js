// components/common/ProgressBar.js
import React from 'react';

const ProgressBar = ({ value, max, label }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{Math.round(value)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;