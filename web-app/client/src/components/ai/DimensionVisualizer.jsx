import React, { useState } from 'react';
import { FaRuler, FaRulerCombined, FaCube, FaHome, FaVectorSquare, FaInfoCircle, FaExpand } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DimensionVisualizer = ({ dimensions, darkMode }) => {
  const [expandedView, setExpandedView] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState(null);
  
  if (!dimensions) return null;
  
  // Calculate building dimensions based on area
  const buildingLength = Math.sqrt(dimensions.area * 1.2).toFixed(0);
  const buildingWidth = (dimensions.area / buildingLength).toFixed(0);
  const buildingHeight = (dimensions.area * 0.03).toFixed(0);
  
  const containerClasses = `rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow-lg border ${
    darkMode ? 'border-gray-700' : 'border-gray-200'
  }`;
  
  const cardClasses = `rounded-lg p-4 ${darkMode ? 'bg-gray-750' : 'bg-gray-50'} mb-4 transition-all duration-300`;
  
  const titleClasses = `font-bold mb-2 flex items-center ${
    darkMode ? 'text-blue-400' : 'text-blue-600'
  }`;
  
  const valueClasses = `text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`;
  
  const unitClasses = `ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`;
  
  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
  };

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          AI-Generated Measurements
        </h2>
        <button 
          onClick={toggleExpandedView}
          className={`p-2 rounded-lg flex items-center ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-blue-400' 
              : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
          } transition-colors`}
        >
          <FaExpand className="mr-2" />
          {expandedView ? 'Collapse' : 'Expand'} View
        </button>
      </div>
      
      <div className={`grid gap-6 ${expandedView ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        <div>
          <div className={`${cardClasses} hover:shadow-md`}>
            <h3 className={titleClasses}>
              <FaHome className="mr-2" /> Building Dimensions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Area</p>
                <p className={valueClasses}>
                  {dimensions.area} <span className={unitClasses}>sq ft</span>
                </p>
              </div>
              <div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Rooms</p>
                <p className={valueClasses}>{dimensions.rooms}</p>
              </div>
              <div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Floors</p>
                <p className={valueClasses}>{dimensions.floors || 2}</p>
              </div>
              <div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Length</p>
                <p className={valueClasses}>
                  {buildingLength} <span className={unitClasses}>ft</span>
                </p>
              </div>
              <div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Width</p>
                <p className={valueClasses}>
                  {buildingWidth} <span className={unitClasses}>ft</span>
                </p>
              </div>
              <div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Height</p>
                <p className={valueClasses}>
                  {buildingHeight} <span className={unitClasses}>ft</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className={`${cardClasses} hover:shadow-md`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className={titleClasses}>
                <FaCube className="mr-2" /> Material Quantities
              </h3>
              <div className="flex items-center text-sm bg-blue-500/10 px-3 py-1 rounded-full text-blue-600 dark:text-blue-300">
                <FaInfoCircle className="mr-1" /> Hover for details
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dimensions.materials.map((material, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  } ${
                    activeMaterial === index 
                      ? (darkMode ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-400') 
                      : ''
                  }`}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setActiveMaterial(index)}
                  onMouseLeave={() => setActiveMaterial(null)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{material.name}</span>
                    <span className="font-bold">
                      {material.quantity} <span className="text-xs">{material.unit}</span>
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
                    <motion.div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(material.quantity / 100) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  {activeMaterial === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600"
                    >
                      <p className="text-sm">
                        Estimated cost: <span className="font-bold">₹{material.cost || '25,000'}</span>
                      </p>
                      <p className="text-sm mt-1">
                        Delivery: <span className="font-bold">{material.delivery || '3-5 days'}</span>
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className={`${cardClasses} hover:shadow-md ${expandedView ? 'h-[500px]' : 'h-[380px]'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={titleClasses}>
                <FaVectorSquare className="mr-2" /> 3D Visualization
              </h3>
              <div className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-300">
                LIVE RENDERING
              </div>
            </div>
            
            <div className="relative h-4/5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Building visualization */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  {/* Base */}
                  <div className="w-64 h-40 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-t-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 rounded-t-lg"></div>
                  </div>
                  
                  {/* Structure */}
                  <div className="absolute top-0 left-4 w-56 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-t-lg"></div>
                  </div>
                  
                  {/* Roof */}
                  <div className="absolute -top-4 left-8 w-48 h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-md"></div>
                  
                  {/* Windows */}
                  <div className="absolute top-8 left-6 grid grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-4 h-6 bg-cyan-200 rounded-sm"
                      ></div>
                    ))}
                  </div>
                  
                  {/* Door */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-amber-700 rounded-t-md"></div>
                  
                  {/* Dimension indicators */}
                  <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                    <div className="flex items-center">
                      <div className="h-0.5 bg-blue-500 w-40"></div>
                      <div className="mx-2 text-xs font-medium bg-blue-500 text-white px-2 py-1 rounded">
                        {buildingLength} ft
                      </div>
                      <div className="h-0.5 bg-blue-500 w-40"></div>
                    </div>
                  </div>
                  
                  <div className="absolute top-0 -left-8 flex items-center h-full">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-32 bg-blue-500"></div>
                      <div className="my-2 text-xs font-medium bg-blue-500 text-white px-2 py-1 rounded">
                        {buildingHeight} ft
                      </div>
                      <div className="w-0.5 h-32 bg-blue-500"></div>
                    </div>
                  </div>
                  
                  {/* Interactive markers */}
                  <div className="absolute top-12 -right-8">
                    <div className="relative group">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse cursor-pointer"></div>
                      <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-red-400 opacity-75 group-hover:animate-ping"></div>
                      <div className="absolute top-4 left-4 w-48 bg-gray-800 text-white text-sm p-3 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="font-bold">Structural Support</p>
                        <p>Additional reinforcement suggested in this area</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating info panel */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                <h4 className="font-bold text-sm mb-2">AI Analysis</h4>
                <ul className="text-xs space-y-1">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></div>
                    Optimal material distribution
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1 mr-2"></div>
                    5% steel reduction possible
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2"></div>
                    Foundation depth: 12ft
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg p-4 text-white">
            <h3 className="font-bold mb-3 flex items-center">
              <FaRulerCombined className="mr-2" /> AI Recommendations
            </h3>
            <ul className="space-y-2">
              <motion.li 
                className="flex items-start p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3"></span>
                <div>
                  <p className="font-medium">Structural Optimization</p>
                  <p className="text-sm opacity-80">Reduce steel usage by 8% with new design patterns</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3"></span>
                <div>
                  <p className="font-medium">Material Alternatives</p>
                  <p className="text-sm opacity-80">Use precast concrete panels to reduce labor costs by 15%</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3"></span>
                <div>
                  <p className="font-medium">Sustainability</p>
                  <p className="text-sm opacity-80">Install solar panels to reduce energy costs by 25% annually</p>
                </div>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-200 dark:border-blue-700/50"
      >
        <div className="flex items-start">
          <div className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            <FaRuler className="text-lg" />
          </div>
          <div className="flex-1">
            <p className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              AI Analysis Complete - 94% Accuracy
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                style={{ width: '94%' }}
              ></div>
            </div>
            <p className={`text-sm mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Dimensions extracted from blueprints. Review and confirm measurements before proceeding.
            </p>
          </div>
          <button className={`px-4 py-2 rounded-lg font-medium ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } transition-colors`}>
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DimensionVisualizer;