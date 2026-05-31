import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure .js extension

// Helper to generate token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = await User.create({ name, email, password });
    
    const token = signToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name: user.name } });
  } catch (error) {
    console.error("REGISTRATION ERROR:", error); // THE CLUE IS HERE
    res.status(400).json({ message: error.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = signToken(user._id);
      res.json({ token, user: { id: user._id, name: user.name } });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};