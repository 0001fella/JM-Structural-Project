const Project = require('../../models/Project');
const DimensionService = require('../ai/dimensionService');

class PricingEngine {
  async generateQuotation(projectId, region) {
    try {
      const project = await Project.findById(projectId)
        .populate('blueprints');
      
      if (!project) throw new Error('Project not found');
      
      let totalCost = 0;
      const itemizedCosts = [];
      
      for (const blueprint of project.blueprints) {
        const result = await DimensionService.extractDimensions(blueprint.filePath);
        if (!result.success) continue;
        
        const costEstimate = await DimensionService.calculateCostEstimate(
          result.dimensions,
          result.materials,
          region
        );
        
        totalCost += costEstimate.totalCost;
        itemizedCosts.push(...costEstimate.itemizedCosts);
      }
      
      const profitMargin = project.profitMargin || 15;
      const finalCost = totalCost * (1 + profitMargin/100);
      
      return {
        success: true,
        quotation: {
          projectId,
          region,
          baseCost: totalCost,
          profitMargin,
          finalCost,
          items: itemizedCosts,
          currency: 'KES'
        }
      };
    } catch (error) {
      console.error('Quotation generation error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new PricingEngine();