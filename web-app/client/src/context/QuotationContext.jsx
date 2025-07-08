import React, { createContext, useState, useContext } from 'react';

export const QuotationContext = createContext();

export const QuotationProvider = ({ children }) => {
  const [quotationData, setQuotationData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [aiResults, setAiResults] = useState(null);

  const processBlueprint = async (file) => {
    setProcessing(true);
    setTimeout(() => {
      setAiResults({
        dimensions: {
          area: 2450,
          rooms: 5,
          materials: [
            { name: 'Concrete', quantity: 150, unit: 'm³' },
            { name: 'Bricks', quantity: 12000, unit: 'units' },
            { name: 'Steel', quantity: 4500, unit: 'kg' }
          ]
        },
        costEstimate: 125000
      });
      setProcessing(false);
    }, 3000);
  };

  const updateQuotation = (data) => {
    setQuotationData(data);
  };

  return (
    <QuotationContext.Provider
      value={{
        quotationData,
        aiResults,
        processing,
        processBlueprint,
        updateQuotation
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
};

// ✅ ADD THIS:
export const useQuotation = () => useContext(QuotationContext);
