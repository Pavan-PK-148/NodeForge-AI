// --- controllers/portfolioController.js ---
import mongoose from 'mongoose';
import Portfolio from '../models/Portfolio.js';

// @desc    Get portfolio dataset instance for authenticated user
// @route   GET /api/portfolio
export const getPortfolio = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Authorization layer missing token payload context.' });
    }

    const portfolios = await Portfolio.find({ user: req.user.id });
    return res.status(200).json(portfolios);
  } catch (error) {
    console.error('[PORTFOLIO GET FAULT]:', error.message);
    return res.status(500).json({ message: 'Internal network fetch breakdown.', error: error.message });
  }
};

// @desc    Update portfolio transaction packet
// @route   POST /api/portfolio
export const savePortfolio = async (req, res) => {
  try {
    // FIX: Check for both properties to protect against token object inconsistencies
    const userId = req.user?.id || req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Write permission token unverified.' });
    }

    const cleanBody = { ...req.body };
    delete cleanBody.user; // Block query spoofing injections
    delete cleanBody._id;

    // Direct isolated tracking update to specific owner user ID context node
    let portfolio = await Portfolio.findOneAndUpdate(
      { user: userId }, // FIX: Uses the unified runtime userId variable
      { $set: cleanBody },
      { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json(portfolio);
  } catch (error) {
    console.error('[PORTFOLIO SAVE FAULT]:', error.message);
    return res.status(400).json({ message: 'Data structural build integrity fault.', error: error.message });
  }
};

// @desc    Get a portfolio instance publicly via slug/username map
// @route   GET /api/portfolio/public/:username
export const getPublicPortfolio = async (req, res) => {
  try {
    const { username } = req.params;
    
    // 1. Build a dynamic array of conditions so we NEVER match against "null"
    const queryConditions = [];

    // 2. If it's a valid ObjectId, look it up by ID keys safely
    if (mongoose.Types.ObjectId.isValid(username)) {
      queryConditions.push({ _id: username });
      queryConditions.push({ user: username });
    }

    // 3. Clean and escape the username string to prevent Regex injection attacks
    const cleanUsername = username.replace(/-/g, ' ').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    queryConditions.push({ 
      "personalInfo.fullName": { $regex: new RegExp(`^${cleanUsername}$`, 'i') } 
    });

    // 4. Query using the clean, isolated conditions array
    let portfolio = await Portfolio.findOne({ $or: queryConditions });

    // Development system profile rendering fallback mechanism
    if (!portfolio && username.startsWith('dev-node-')) {
      portfolio = await Portfolio.findOne(); 
    }

    if (!portfolio) {
      return res.status(404).json({ 
        message: `Profile infrastructure node @${username} could not be resolved on this cluster.` 
      });
    }

    return res.status(200).json(portfolio);
  } catch (error) {
    console.error('[PUBLIC PORTFOLIO FETCH FAULT]:', error.message);
    return res.status(500).json({ message: 'Public lookup resolver failure.', error: error.message });
  }
};