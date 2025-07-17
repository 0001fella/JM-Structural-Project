import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import api from '../../services/api';

const BlueprintUploader = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const { currentProject } = useProject();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !currentProject) return;
    
    setIsUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('blueprint', file);
      formData.append('projectId', currentProject._id);
      
      const response = await api.post('/upload/blueprint', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        onSuccess(response.data);
      } else {
        setError('Failed to process blueprint');
      }
    } catch (err) {
      setError('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="blueprint-uploader">
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input 
          type="file" 
          accept=".jpg,.jpeg,.png,.pdf" 
          onChange={handleFileChange}
          className="hidden"
          id="blueprint-upload"
        />
        <label 
          htmlFor="blueprint-upload" 
          className="cursor-pointer bg-blue-50 px-4 py-2 rounded-md text-blue-600 font-medium"
        >
          Select Blueprint
        </label>
        
        {file && (
          <div className="mt-4">
            <p className="text-sm">{file.name}</p>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
            >
              {isUploading ? 'Processing...' : 'Upload & Analyze'}
            </button>
          </div>
        )}
        
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default BlueprintUploader;