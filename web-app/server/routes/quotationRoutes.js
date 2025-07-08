import express from 'express';
import protect from '../middleware/auth.js';
import { 
  createQuotation, 
  updateQuotation, 
  exportQuotation 
} from '../controllers/quotationController.js';

const router = express.Router();

router.post('/', protect, createQuotation);
router.put('/:id', protect, updateQuotation);
router.get('/:id/export/:format', protect, exportQuotation);

export default router;