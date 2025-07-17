import React from 'react';
import { motion } from 'framer-motion';

const StatsWidget = ({ 
  stat, 
  darkMode, 
  cardBg, 
  borderColor, 
  textColor, 
  secondaryText, 
  index 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`rounded-xl p-6 shadow-lg overflow-hidden relative ${cardBg} border ${borderColor}`}
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
      
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${secondaryText}`}>
            {stat.title}
          </p>
          <p className={`text-2xl font-bold mt-1 ${textColor}`}>
            {stat.value}
          </p>
        </div>
        <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
          {stat.icon}
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <span className={`text-xs font-medium ${
          stat.change.startsWith('+') 
            ? darkMode 
              ? 'bg-green-900/30 text-green-400' 
              : 'bg-green-100 text-green-700'
            : darkMode 
              ? 'bg-red-900/30 text-red-400' 
              : 'bg-red-100 text-red-700'
        } py-1 px-2 rounded-full`}>
          {stat.change}
        </span>
        <span className={`text-xs ml-2 ${secondaryText}`}>last 30 days</span>
      </div>
      
      {/* Animated progress bar */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
        className={`absolute bottom-0 left-0 h-0.5 ${
          stat.change.startsWith('+') 
            ? darkMode ? 'bg-green-500' : 'bg-green-400' 
            : darkMode ? 'bg-red-500' : 'bg-red-400'
        }`}
      ></motion.div>
    </motion.div>
  );
};

export default StatsWidget;