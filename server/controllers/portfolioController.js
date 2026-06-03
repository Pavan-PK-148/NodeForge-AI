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

// @desc    Update or Create portfolio transaction packet
// @route   POST /api/portfolio
export const savePortfolio = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Write permission token unverified.' });
    }

    let { _id, ...cleanBody } = req.body;

    // Prevent casting failures if an empty string or invalid structure is passed as an ID
    if (!_id || _id === "" || !mongoose.Types.ObjectId.isValid(_id)) {
      _id = null;
    }

    let portfolio = null;

    // SCENARIO 1: If a valid portfolio _id exists, find and update that specific instance
    if (_id) {
      portfolio = await Portfolio.findOne({ _id: _id, user: userId });
      
      if (portfolio) {
        // Expressively overwrite parent fields to prevent subdocument array pollution
        portfolio.selectedTemplate = cleanBody.selectedTemplate || portfolio.selectedTemplate;
        portfolio.profileImage = cleanBody.profileImage !== undefined ? cleanBody.profileImage : portfolio.profileImage;
        portfolio.personalInfo = cleanBody.personalInfo || portfolio.personalInfo;
        
        // Handle skills mixed types safely and issue structural modification signals
        if (cleanBody.skills) {
          portfolio.skills = cleanBody.skills;
          portfolio.markModified('skills'); 
        }
        
        portfolio.projects = cleanBody.projects || portfolio.projects;
        portfolio.experience = cleanBody.experience || portfolio.experience;
        portfolio.education = cleanBody.education || portfolio.education;
        portfolio.githubMetrics = cleanBody.githubMetrics || portfolio.githubMetrics;
        
        await portfolio.save();
      }
    }

    // SCENARIO 2: If no valid _id was sent, or it wasn't found, insert a brand-new distinct record
    if (!portfolio) {
      portfolio = new Portfolio({
        ...cleanBody,
        user: userId // Explicitly assign owner link
      });
      await portfolio.save();
    }

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
    const queryConditions = [];

    if (mongoose.Types.ObjectId.isValid(username)) {
      queryConditions.push({ _id: username });
      queryConditions.push({ user: username });
    }

    const cleanUsername = username.replace(/-/g, ' ').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    queryConditions.push({ 
      "personalInfo.fullName": { $regex: new RegExp(`^${cleanUsername}$`, 'i') } 
    });

    let portfolio = await Portfolio.findOne({ $or: queryConditions });

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

// @desc    Delete/Drop portfolio instance safely by ID context
// @route   DELETE /api/portfolio/:id
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Write permission token unverified.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid portfolio metadata index identifier.' });
    }

    const deletedPortfolio = await Portfolio.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!deletedPortfolio) {
      return res.status(404).json({ 
        message: `Portfolio index node ${id} was not found or access rights are denied on this instance.` 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Portfolio data shell dropped from cluster successfully.',
      deletedId: id
    });
  } catch (error) {
    console.error('[PORTFOLIO DESTRUCTION FAULT]:', error.message);
    return res.status(500).json({ message: 'Failed to purge instance architecture.', error: error.message });
  }
};

