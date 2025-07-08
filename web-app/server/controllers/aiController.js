import asyncHandler from 'express-async-handler';
import { processWithPlanswift } from '../services/ai/planswiftService.js';
import { processWithCubit } from '../services/ai/cubitService.js';
import Project from '../models/Project.js';

/**
 * @desc    Estimate cost based on dimensions and region
 * @route   POST /api/ai/estimate
 * @access  Private
 */
const estimateCost = asyncHandler(async (req, res) => {
  const { dimensions, region } = req.body;

  if (!dimensions || !region) {
    res.status(400);
    throw new Error('Both dimensions and region are required');
  }

  const estimate = await processWithPlanswift(dimensions, region);

  res.status(200).json({
    success: true,
    data: estimate
  });
});

/**
 * @desc    Generate takeoff data from uploaded blueprint
 * @route   POST /api/ai/takeoff
 * @access  Private
 */
const generateTakeoff = asyncHandler(async (req, res) => {
  const file = req.file;
  const { region } = req.body;

  if (!file) {
    res.status(400);
    throw new Error('Blueprint file is required');
  }

  if (!region) {
    res.status(400);
    throw new Error('Region is required');
  }

  const blueprintPath = file.path;

  const takeoffData = await processWithCubit(blueprintPath, region);

  const project = await Project.create({
    user: req.user._id,
    name: file.originalname,
    blueprint: blueprintPath,
    region,
    status: 'completed',
    aiResults: takeoffData
  });

  res.status(201).json({
    success: true,
    message: 'Takeoff data generated and project created',
    data: project
  });
});

export { estimateCost, generateTakeoff };
