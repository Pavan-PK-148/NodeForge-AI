import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getPortfolio, 
  savePortfolio, 
  getPublicPortfolio,
  deletePortfolio
} from '../controllers/portfolioController.js'; 
import { syncGitHubData } from '../controllers/githubController.js';
import { generateTailoredResume, parseResume } from '../controllers/resumeController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/public/:username').get(getPublicPortfolio); 


router.route('/')
  .get(protect, getPortfolio)
  .post(protect, savePortfolio);

router.route('/:id')
  .delete(protect, deletePortfolio);

router.route('/upload-resume').post(protect, upload.single('resume'), parseResume);

// Inside portfolioRoutes.js
router.route('/tailor-resume').post(protect, generateTailoredResume);

export default router;