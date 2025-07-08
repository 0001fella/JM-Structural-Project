import React from 'react';
import QuotationEditor from '../components/dashboard/QuotationEditor';
import FileUpload from '../components/dashboard/FileUpload';

const EditorPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Editor</h1>
      
      {/* Upload blueprint and trigger AI */}
      <FileUpload />

      {/* Display AI-generated quotation editing interface */}
      <QuotationEditor />
    </div>
  );
};

export default EditorPage;
