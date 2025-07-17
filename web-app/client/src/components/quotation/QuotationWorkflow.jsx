import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUpload, FaRulerCombined, FaFileInvoice, 
  FaEye, FaArrowLeft, FaCheckCircle,
  FaSpinner, FaFilePdf, FaFileExcel
} from 'react-icons/fa';
import BlueprintUploader from '../upload/BlueprintUploader';
import DimensionVisualizer from '../ai/DimensionVisualizer';
import EditableBOQ from './EditableBOQ';
import QuotationPreview from '../dashboard/QuotationPreview';

const QuotationWorkflow = ({
  activeQuotationStep,
  setActiveQuotationStep,
  themeClasses,
  processingStatus,
  processBlueprint,
  aiResults,
  generateQuotation,
  quotation,
  setQuotation,
  saveQuotation,
  exportQuotation,
  filePreviews
}) => {
  const steps = [
    { id: 1, title: 'Upload Blueprint', icon: <FaUpload /> },
    { id: 2, title: 'Review Dimensions', icon: <FaRulerCombined /> },
    { id: 3, title: 'Edit Quotation', icon: <FaFileInvoice /> },
    { id: 4, title: 'Preview & Download', icon: <FaEye /> }
  ];

  const handleQuotationUpdate = useCallback((updatedQuotation) => {
    setQuotation(updatedQuotation);
    saveQuotation(updatedQuotation);
  }, [setQuotation, saveQuotation]);

  return (
    <div className={`rounded-2xl p-6 ${themeClasses.cardBg} ${themeClasses.shadow} border ${themeClasses.borderColor}`}>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${themeClasses.textColor}`}>Quotation Generator</h2>
          {activeQuotationStep > 0 && (
            <button 
              onClick={() => setActiveQuotationStep(prev => Math.max(0, prev - 1))}
              className={`flex items-center px-4 py-2 rounded-lg ${themeClasses.buttonSecondary} ${themeClasses.textColor}`}
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
          )}
        </div>
        
        {/* Step Indicator */}
        <div className="flex justify-between relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-700 -z-10"></div>
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              <motion.button
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                  activeQuotationStep >= index 
                    ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
                    : `${themeClasses.inputBg} ${themeClasses.textColor}`
                }`}
                onClick={() => activeQuotationStep > index && setActiveQuotationStep(index)}
                whileHover={{ scale: activeQuotationStep > index ? 1.1 : 1 }}
                disabled={activeQuotationStep <= index}
              >
                {step.icon}
              </motion.button>
              <span className={`mt-2 text-sm font-medium ${
                activeQuotationStep >= index 
                  ? themeClasses.textColor 
                  : themeClasses.secondaryText
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="transition-all duration-300">
          {activeQuotationStep === 0 && (
            <div className="text-center">
              <h3 className={`text-xl font-semibold mb-6 ${themeClasses.textColor}`}>
                Upload Architectural Design
              </h3>
              <BlueprintUploader 
                onUpload={processBlueprint} 
                themeClasses={themeClasses}
                multiple={true}
              />
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                <p>Supported formats: PDF, JPG, PNG, DWG, DXF</p>
                <p className="mt-1">Max file size: 20MB per file</p>
              </div>
            </div>
          )}

          {activeQuotationStep === 1 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.textColor}`}>
                  Design Analysis Results
                </h3>
                {processingStatus === 'complete' && (
                  <button 
                    onClick={generateQuotation}
                    className={`px-6 py-2 rounded-lg flex items-center ${themeClasses.buttonPrimary} text-white`}
                  >
                    Generate Quotation <FaFileInvoice className="ml-2" />
                  </button>
                )}
              </div>

              {processingStatus === 'processing' && (
                <div className="flex flex-col items-center justify-center py-12">
                  <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
                  <p className={`text-lg ${themeClasses.textColor}`}>
                    Analyzing your architectural design...
                  </p>
                  <p className={`mt-2 ${themeClasses.secondaryText}`}>
                    Extracting dimensions and calculating materials
                  </p>
                </div>
              )}

              {processingStatus === 'complete' && aiResults && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 ${themeClasses.textColor}`}>
                      Dimensions & Materials
                    </h4>
                    <DimensionVisualizer 
                      dimensions={aiResults.dimensions} 
                      themeClasses={themeClasses}
                      filePreviews={filePreviews}
                    />
                  </div>
                  
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 ${themeClasses.textColor}`}>
                      Cost Breakdown
                    </h4>
                    <div className="space-y-4">
                      {aiResults.costBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className={themeClasses.textColor}>{item.category}</span>
                              <span className="font-medium">${item.amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" 
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800`}>
                      <h5 className={`font-bold mb-2 flex items-center ${themeClasses.textColor}`}>
                        <FaLightbulb className="text-yellow-500 mr-2" /> AI Recommendations
                      </h5>
                      <ul className="list-disc pl-5 space-y-1">
                        {aiResults.recommendations.map((rec, i) => (
                          <li key={i} className={themeClasses.secondaryText}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeQuotationStep === 2 && quotation && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.textColor}`}>
                  Edit Quotation Details
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => exportQuotation('pdf', quotation)}
                    className={`px-4 py-2 rounded-lg flex items-center ${themeClasses.buttonSecondary}`}
                  >
                    <FaFilePdf className="text-red-500 mr-2" /> PDF
                  </button>
                  <button 
                    onClick={() => exportQuotation('excel', quotation)}
                    className={`px-4 py-2 rounded-lg flex items-center ${themeClasses.buttonSecondary}`}
                  >
                    <FaFileExcel className="text-green-500 mr-2" /> Excel
                  </button>
                  <button 
                    onClick={() => setActiveQuotationStep(3)}
                    className={`px-4 py-2 rounded-lg flex items-center ${themeClasses.buttonPrimary} text-white`}
                  >
                    Preview <FaEye className="ml-2" />
                  </button>
                </div>
              </div>
              
              <EditableBOQ 
                quotation={quotation} 
                onUpdate={handleQuotationUpdate}
                themeClasses={themeClasses}
              />
            </div>
          )}

          {activeQuotationStep === 3 && quotation && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.textColor}`}>
                  Quotation Preview
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveQuotationStep(2)}
                    className={`px-4 py-2 rounded-lg flex items-center ${themeClasses.buttonSecondary}`}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button 
                    onClick={() => exportQuotation('pdf', quotation)}
                    className={`px-4 py-2 rounded-lg flex items-center bg-gradient-to-r from-red-600 to-orange-500 text-white`}
                  >
                    <FaFilePdf className="mr-2" /> Download PDF
                  </button>
                </div>
              </div>
              
              <QuotationPreview 
                quotation={quotation} 
                themeClasses={themeClasses}
                isFullPreview={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotationWorkflow;