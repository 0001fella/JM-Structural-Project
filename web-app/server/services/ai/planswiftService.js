import axios from 'axios';
import { getAIService } from '../../config/aiConfig.js';

export const processWithPlanswift = async (dimensions, region) => {
  const { endpoint, apiKey } = getAIService('planswift');
  
  try {
    const response = await axios.post(endpoint, {
      dimensions,
      region,
      options: {
        detailedBreakdown: true,
        includeLabor: true
      }
    }, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    
    return response.data;
  } catch (error) {
    console.error('Planswift Error:', error.response?.data || error.message);
    throw new Error('Failed to process with Planswift');
  }
};