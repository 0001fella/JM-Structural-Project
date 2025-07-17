import Testimonial from '../models/Testimonial.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({});
  res.json(testimonials);
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = asyncHandler(async (req, res) => {
  const { quote, name, title, company, rating, results } = req.body;
  
  const testimonial = new Testimonial({
    quote,
    name,
    title,
    company,
    rating,
    results
  });

  const createdTestimonial = await testimonial.save();
  res.status(201).json(createdTestimonial);
});

// @desc    Get featured testimonials
// @route   GET /api/testimonials/featured
// @access  Public
const getFeaturedTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ featured: true });
  res.json(testimonials);
});

export { getTestimonials, createTestimonial, getFeaturedTestimonials };