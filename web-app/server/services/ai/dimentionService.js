const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const config = require('../../config/ai');

class DimensionService {
  constructor() {
    this.services = {
      kenyanHouse: config.KENYAN_HOUSE_AI_ENDPOINT,
      costx: config.COSTX_ENDPOINT,
      cubit: config.CUBIT_ENDPOINT
    };
  }

  async extractDimensions(filePath, service = 'kenyanHouse') {
    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));
      
      const response = await axios.post(
        this.services[service], 
        form, 
        { headers: form.getHeaders() }
      );

      return {
        success: true,
        dimensions: response.data.dimensions,
        materials: response.data.materials
      };
    } catch (error) {
      console.error(`AI Dimension Extraction Error (${service}):`, error);
      return { 
        success: false, 
        error: `AI service ${service} failed: ${error.message}` 
      };
    }
  }

  async calculateCostEstimate(dimensions, materials, region) {
    const regionPricing = require(`../regionalRules/${region}`);
    
    let totalCost = 0;
    const itemizedCosts = [];
    
    for (const [material, quantity] of Object.entries(materials)) {
      const unitPrice = regionPricing[material]?.unitPrice || 0;
      const cost = unitPrice * quantity;
      totalCost += cost;
      
      itemizedCosts.push({
        material,
        quantity,
        unit: regionPricing[material]?.unit || 'unit',
        unitPrice,
        total: cost
      });
    }
    
    return {
      totalCost,
      itemizedCosts,
      currency: regionPricing.currency || 'KES'
    };
  }
}

module.exports = new DimensionService();