import React from 'react';
import { FaFileInvoice, FaDownload, FaEdit, FaTrashAlt, FaCopy } from 'react-icons/fa';

const QuotationManager = ({
  themeClasses,
  quotations,
  currentQuotation,
  setQuotation,
  duplicateQuotation,
  deleteQuotation,
  exportQuotation,
  selectedQuotationId,
  setSelectedQuotationId
}) => {
  return (
    <div className={`rounded-2xl p-6 ${themeClasses.cardBg} ${themeClasses.shadow} border ${themeClasses.borderColor}`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-2xl font-bold ${themeClasses.textColor}`}>Quotation Manager</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg flex items-center ${themeClasses.buttonSecondary}`}
          >
            New Quotation
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className={`rounded-xl p-4 ${themeClasses.cardBg} border ${themeClasses.borderColor}`}>
            <h3 className={`text-lg font-semibold mb-4 ${themeClasses.textColor}`}>
              All Quotations ({quotations.length})
            </h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {quotations.map((quote) => (
                <div 
                  key={quote.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedQuotationId === quote.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                      : themeClasses.hoverBg
                  } ${themeClasses.cardBg} border ${themeClasses.borderColor}`}
                  onClick={() => {
                    setQuotation(quote);
                    setSelectedQuotationId(quote.id);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-medium ${themeClasses.textColor}`}>{quote.project}</h4>
                      <p className={`text-sm ${themeClasses.secondaryText}`}>ID: {quote.id}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          quote.status === 'draft' 
                            ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200' 
                            : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                        }`}>
                          {quote.status}
                        </span>
                        <span className={`ml-2 text-xs ${themeClasses.secondaryText}`}>
                          {quote.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${themeClasses.textColor}`}>
                        ${quote.summary.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-3">
                    <button 
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        exportQuotation('pdf', quote);
                      }}
                      title="Download PDF"
                    >
                      <FaDownload className="text-blue-500" />
                    </button>
                    <button 
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateQuotation(quote.id);
                      }}
                      title="Duplicate"
                    >
                      <FaCopy className="text-gray-500" />
                    </button>
                    <button 
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteQuotation(quote.id);
                      }}
                      title="Delete"
                    >
                      <FaTrashAlt className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
              
              {quotations.length === 0 && (
                <div className={`text-center py-8 ${themeClasses.secondaryText}`}>
                  <FaFileInvoice className="mx-auto text-4xl mb-3" />
                  <p>No quotations created yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {currentQuotation ? (
            <div className={`rounded-xl p-6 ${themeClasses.cardBg} border ${themeClasses.borderColor}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className={`text-xl font-bold ${themeClasses.textColor}`}>
                    {currentQuotation.project}
                  </h3>
                  <p className={`${themeClasses.secondaryText} mt-1`}>
                    Quotation ID: {currentQuotation.id} | Created: {currentQuotation.date}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className={`px-4 py-2 rounded-lg flex items-center ${themeClasses.buttonSecondary}`}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button 
                    onClick={() => exportQuotation('pdf')}
                    className={`px-4 py-2 rounded-lg flex items-center bg-gradient-to-r from-blue-600 to-teal-500 text-white`}
                  >
                    <FaDownload className="mr-2" /> PDF
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className={`font-semibold mb-4 ${themeClasses.textColor}`}>Client Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${themeClasses.secondaryText}`}>Client Name</p>
                    <p className={themeClasses.textColor}>{currentQuotation.client}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${themeClasses.secondaryText}`}>Prepared By</p>
                    <p className={themeClasses.textColor}>{currentQuotation.createdBy}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className={`font-semibold mb-4 ${themeClasses.textColor}`}>Materials Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${themeClasses.borderColor}`}>
                        <th className="text-left pb-2">Item</th>
                        <th className="text-left pb-2">Description</th>
                        <th className="text-right pb-2">Qty</th>
                        <th className="text-right pb-2">Unit Price</th>
                        <th className="text-right pb-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentQuotation.items.map((item, index) => (
                        <tr key={index} className={`border-b ${themeClasses.borderColor}`}>
                          <td className="py-3">{item.item}</td>
                          <td className="py-3">{item.description}</td>
                          <td className="py-3 text-right">{item.quantity} {item.unit}</td>
                          <td className="py-3 text-right">${item.unitPrice.toFixed(2)}</td>
                          <td className="py-3 text-right">${item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between py-2">
                    <span className={themeClasses.textColor}>Subtotal:</span>
                    <span className="font-medium">${currentQuotation.summary.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className={themeClasses.textColor}>Tax (16%):</span>
                    <span className="font-medium">${currentQuotation.summary.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className={themeClasses.textColor}>Discount:</span>
                    <span className="font-medium">${currentQuotation.summary.discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-lg mt-2 border-t pt-3 border-gray-300 dark:border-gray-700">
                    <span className={themeClasses.textColor}>Total:</span>
                    <span>${currentQuotation.summary.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`text-center py-16 rounded-xl ${themeClasses.cardBg} border ${themeClasses.borderColor}`}>
              <FaFileInvoice className="mx-auto text-4xl mb-4 text-gray-400 dark:text-gray-600" />
              <h3 className={`text-xl font-semibold mb-2 ${themeClasses.textColor}`}>No Quotation Selected</h3>
              <p className={themeClasses.secondaryText}>Select a quotation from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotationManager;