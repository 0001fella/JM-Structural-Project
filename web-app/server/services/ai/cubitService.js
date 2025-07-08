import axios from 'axios';
import { getAIService } from '../../config/aiConfig.js';

export const processWithCubit = async (blueprintPath, region) => {
  const { endpoint, apiKey } = getAIService('cubit');
  
  try {
    // In production, upload file to cloud storage first
    const response = await axios.post(endpoint, {
      fileUrl: blueprintPath,
      region,
      precision: 'high'
    }, {
      headers: { 'Cubit-API-Key': apiKey }
    });
    
    return response.data;
  } catch (error) {
    console.error('Cubit Error:', error.response?.data || error.message);
    throw new Error('Failed to generate takeoff with Cubit');
  }
};