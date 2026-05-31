import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getPortfolio, 
  savePortfolio, 
  getPublicPortfolio
} from '../controllers/portfolioController.js'; 
import { syncGitHubData } from '../controllers/githubController.js';
import { parseResume } from '../controllers/resumeController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// --- PUBLIC ROUTE NODES (No 'protect' authorization middleware barrier required) ---
router.route('/public/:username').get(getPublicPortfolio); 

router.route('/')
  .get(protect, getPortfolio)
  .post(protect, savePortfolio);

router.route('/upload-resume').post(protect, upload.single('resume'), parseResume);

export default router;