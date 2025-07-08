import axios from 'axios';
import { getAIService } from '../../config/aiConfig.js';
import { regionRules } from '../regionAdapter.js';

export const processWithCostX = async (dimensions, region) => {
  const { endpoint, apiKey } = getAIService('costX');
  const regionData = regionRules[region] || regionRules['us-east'];
  
  try {
    const response = await axios.post(endpoint, {
      dimensions,
      region: regionData,
      format: 'structured'
    }, {
      headers: { 'X-API-KEY': apiKey }
    });
    
    return response.data.boq;
  } catch (error) {
    console.error('CostX Error:', error.response?.data || error.message);
    throw new Error('Failed to generate BOQ with CostX');
  }
};