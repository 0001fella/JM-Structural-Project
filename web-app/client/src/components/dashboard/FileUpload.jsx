import React, { useState, useRef } from 'react';
import { useQuotation } from '../../context/QuotationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaFilePdf, FaRobot, FaDraftingCompass, FaFileImage, FaFileAlt, FaCheckCircle } from 'react-icons/fa';

const FileUpload = () => {
  const { processBlueprint, aiResults, processing } = useQuotation();
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    setFileName(file.name);
    setFileType(file.type.split('/').pop().toUpperCase());
    processBlueprint(file);
  };

  const getFileIcon = () => {
    if (fileType.includes('PDF')) return <FaFilePdf className="text-red-500" />;
    if (fileType.includes('DWG')) return <FaDraftingCompass className="text-blue-500" />;
    if (fileType.includes('IMAGE')) return <FaFileImage className="text-green-500" />;
    return <FaFileAlt className="text-gray-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-800/30 rounded-full p-2 mr-3">
            <FaFilePdf className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold text-white">Blueprint Analyzer</h2>
        </div>
        <div className="flex items-center bg-blue-800/30 px-3 py-1 rounded-full">
          <span className="text-sm text-white/90">AI-Powered</span>
          <FaRobot className="text-white ml-2" />
        </div>
      </div>

      <div className="p-6">
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 group ${
            dragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-cyan-400'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
                <FaUpload className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <motion.div 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <div className="bg-white rounded-full p-1">
                  <FaRobot className="text-blue-600 text-xs" />
                </div>
              </motion.div>
            </div>
            
            <motion.p 
              className="font-medium text-gray-700 dark:text-gray-200 mb-1"
              whileHover={{ scale: 1.02 }}
            >
              {fileName ? fileName : "Drag & drop your blueprint file"}
            </motion.p>
            
            {!fileName && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Supported formats: PDF, DWG, RVT, IFC, JPG, PNG
              </p>
            )}
            
            <motion.button 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {fileName ? "Replace File" : "Browse Files"}
            </motion.button>
            
            {fileName && (
              <motion.div 
                className="mt-4 flex items-center justify-center text-green-600 dark:text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FaCheckCircle className="mr-2" />
                <span>File Selected</span>
              </motion.div>
            )}
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {['PDF', 'DWG', 'RVT', 'IFC'].map((format) => (
              <div 
                key={format}
                className={`px-2 py-1 rounded text-xs flex items-center ${
                  fileType === format
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {format}
              </div>
            ))}
          </div>
          
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.dwg,.rvt,.ifc,.jpg,.jpeg,.png"
          />
        </div>

        <AnimatePresence>
          {processing && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <div className="flex items-center justify-center p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-cyan-700/50">
                <div className="relative mr-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Analyzing blueprint with AI...
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: ['0%', '30%', '65%', '100%'] }}
                      transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {aiResults && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <FaRobot className="text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">AI Analysis Results</h3>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400">94% accuracy</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg border border-blue-200 dark:border-cyan-700/50">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Estimated Cost</p>
                  <p className="font-bold text-2xl text-blue-700 dark:text-blue-400">
                    ${aiResults.costEstimate.toLocaleString()}
                  </p>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" 
                      style={{ width: `${Math.min(aiResults.costEstimate/50000, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 p-4 rounded-lg border border-cyan-200 dark:border-teal-700/50">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Project Area</p>
                  <p className="font-bold text-2xl text-cyan-700 dark:text-cyan-400">
                    {aiResults.dimensions.area} m²
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500" 
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Precision: 92%</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Key Materials Identified</h4>
                  <span className="text-xs bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 px-2 py-1 rounded-full">
                    {aiResults.dimensions.materials.length} materials
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {aiResults.dimensions.materials.slice(0, 5).map((material, index) => (
                    <motion.div
                      key={index}
                      className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
                      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    >
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mb-2">
                        {getFileIcon()}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {material.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {material.quantity} {material.unit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.button 
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Detailed Estimate
                </motion.button>
                <motion.button 
                  className="py-3 px-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all flex items-center justify-center"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Export Report
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!processing && !aiResults && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
              <div className="flex items-center mb-2">
                <div className="bg-blue-500 text-white p-2 rounded-md mr-3">
                  <FaFilePdf />
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Supported Formats</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                PDF, DWG, RVT, IFC, JPG, PNG, and more
              </p>
            </div>
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-700/50">
              <div className="flex items-center mb-2">
                <div className="bg-cyan-500 text-white p-2 rounded-md mr-3">
                  <FaDraftingCompass />
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Architectural AI</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detects structures, materials, and dimensions
              </p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700/50">
              <div className="flex items-center mb-2">
                <div className="bg-teal-500 text-white p-2 rounded-md mr-3">
                  <FaRobot />
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Instant Estimates</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate cost estimates in seconds
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;