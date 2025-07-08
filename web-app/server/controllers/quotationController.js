import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import Quotation from '../models/Quotation.js';
import { applyRegionalPricing } from '../services/regionAdapter.js';
import { generateQuotationDocument } from '../services/quotationGenerator.js';
import { processWithCostX } from '../services/ai/costXService.js';

/**
 * @desc    Create a quotation for a project
 * @route   POST /api/quotations
 * @access  Private
 */
const createQuotation = asyncHandler(async (req, res) => {
  const { projectId, profitMargin = 15 } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized for this project');
  }

  // Generate BOQ from CostX AI
  const boqData = await processWithCostX(project.aiResults.dimensions, project.region);
  const materials = applyRegionalPricing(boqData.materials, project.region);

  const subtotal = calculateSubtotal(materials);
  const taxes = subtotal * 0.1; // 10% tax (can be dynamic later)
  const total = subtotal + taxes + (subtotal * profitMargin / 100);

  const quotation = await Quotation.create({
    project: project._id,
    materials,
    profitMargin,
    subtotal,
    taxes,
    total,
    status: 'draft',
  });

  res.status(201).json(quotation);
});

/**
 * @desc    Update a quotation
 * @route   PUT /api/quotations/:id
 * @access  Private
 */
const updateQuotation = asyncHandler(async (req, res) => {
  const { materials, profitMargin } = req.body;
  const quotation = await Quotation.findById(req.params.id).populate('project');

  if (!quotation) {
    res.status(404);
    throw new Error('Quotation not found');
  }

  if (quotation.project.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update');
  }

  const subtotal = calculateSubtotal(materials);
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes + (subtotal * profitMargin / 100);

  quotation.materials = materials;
  quotation.profitMargin = profitMargin;
  quotation.subtotal = subtotal;
  quotation.taxes = taxes;
  quotation.total = total;
  quotation.version += 1;

  const updatedQuotation = await quotation.save();
  res.status(200).json(updatedQuotation);
});

/**
 * @desc    Export a quotation in PDF or Excel format
 * @route   GET /api/quotations/:id/export/:format
 * @access  Private
 */
const exportQuotation = asyncHandler(async (req, res) => {
  const { format } = req.params;
  const quotation = await Quotation.findById(req.params.id).populate('project');

  if (!quotation) {
    res.status(404);
    throw new Error('Quotation not found');
  }

  if (quotation.project.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to export');
  }

  const fileData = await generateQuotationDocument(quotation, format);

  res.setHeader('Content-Type',
    format === 'pdf'
      ? 'application/pdf'
      : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition',
    `attachment; filename=quotation-${quotation._id}.${format}`
  );

  res.send(fileData);
});

/** Helper: Calculate subtotal */
function calculateSubtotal(materials) {
  return materials.reduce((sum, item) => sum + (item.quantity * item.unitRate), 0);
}

export { createQuotation, updateQuotation, exportQuotation };
