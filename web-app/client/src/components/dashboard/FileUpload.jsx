import React from 'react';
import { useQuotation } from '../../context/QuotationContext';


const FileUpload = () => {
  const { processBlueprint, aiResults, processing } = useQuotation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processBlueprint(file);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Blueprint</h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />

      {processing && (
        <p className="text-yellow-600 mt-3 font-medium">Processing blueprint...</p>
      )}

      {aiResults && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">AI Results</h3>
          <p><strong>Estimated Cost:</strong> ${aiResults.costEstimate}</p>
          <p><strong>Rooms:</strong> {aiResults.dimensions.rooms}</p>
          <p><strong>Area:</strong> {aiResults.dimensions.area} m²</p>

          <h4 className="mt-3 font-semibold">Materials:</h4>
          <ul className="list-disc list-inside">
            {aiResults.dimensions.materials.map((material, index) => (
              <li key={index}>
                {material.name}: {material.quantity} {material.unit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
