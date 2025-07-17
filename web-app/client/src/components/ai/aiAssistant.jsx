import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaTimes } from 'react-icons/fa';

const AiAssistant = ({ setAiAssistantVisible }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed right-6 bottom-6 z-20 w-80 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white border border-gray-200"
    >
      <div className="p-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="flex items-center">
          <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <FaRobot className="text-white text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-white">Construction AI</h3>
            <p className="text-xs text-blue-100">Ready to assist</p>
          </div>
        </div>
        <button 
          onClick={() => setAiAssistantVisible(false)}
          className="text-blue-100 hover:text-white transition-colors"
        >
          <FaTimes className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-medium">AI Tip:</span> Your "Residential High-Rise" project could save 12% on structural materials with optimized design.
        </p>
        <div className="flex space-x-2">
          <button className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Optimize
          </button>
          <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Later
          </button>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
    </motion.div>
  );
};

export default AiAssistant;