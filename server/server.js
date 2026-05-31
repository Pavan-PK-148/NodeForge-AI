import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { syncGitHubData } from './controllers/githubController.js';
import { protect } from './middleware/authMiddleware.js';

// Load environmental context variables
dotenv.config();

const app = express();

// Establish state configurations 
connectDB();

// Traffic parsing management middleware layers
app.use(cors({ 
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : "http://localhost:5173", 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] 
}));
app.use(express.json());

// Bind the API target cluster routing systems
app.get('/api/github/sync', protect, syncGitHubData);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ONLINE", timestamp: new Date() });
});

// Hardcoded to port 3000 as per your operational requirements
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Studio Engine Server running on routing port: ${PORT}`);
});