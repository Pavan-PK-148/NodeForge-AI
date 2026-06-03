import express from 'express';
import multer from 'multer'; // 1. Import multer directly
import { optimizeResumeMatrix } from '../controllers/resumeController.js';
import { generateTailoredResume } from '../controllers/skillController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route: POST /api/resume/optimize
router.post('/optimize', protect, optimizeResumeMatrix);


router.post('/generate-tailored', protect, upload.single('resume'), generateTailoredResume);

export default router;