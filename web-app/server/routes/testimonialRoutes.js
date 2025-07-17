import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  getFeaturedTestimonials
} from '../controllers/testimonialController.js';

const router = express.Router();

router.route('/').get(getTestimonials).post(createTestimonial);
router.route('/featured').get(getFeaturedTestimonials);

export default router;