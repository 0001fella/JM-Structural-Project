const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');
const DimensionService = require('../services/ai/dimensionService');

exports.uploadBlueprint = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    const blueprint = req.files.blueprint;
    const projectId = req.body.projectId;
    const uploadPath = path.join(__dirname, '../uploads', blueprint.name);

    await blueprint.mv(uploadPath);

    // Process with AI
    const aiResult = await DimensionService.extractDimensions(uploadPath);
    if (!aiResult.success) {
      return res.status(500).json({ 
        success: false, 
        error: 'AI processing failed' 
      });
    }

    // Update project
    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: {
          blueprints: {
            name: blueprint.name,
            filePath: uploadPath,
            dimensions: aiResult.dimensions,
            materials: aiResult.materials
          }
        }
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Blueprint processed successfully',
      project,
      dimensions: aiResult.dimensions,
      materials: aiResult.materials
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};