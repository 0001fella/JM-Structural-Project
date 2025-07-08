import express from 'express';
import protect from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { estimateCost, generateTakeoff } from '../controllers/aiController.js';

const router = express.Router();

router.post('/estimate', protect, estimateCost);
router.post('/takeoff', protect, upload.single('blueprint'), generateTakeoff);

export default router;