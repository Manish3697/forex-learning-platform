const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update user profile
router.put('/profile/:id', async (req, res) => {
  try {
    const { firstName, lastName, bio, experienceLevel } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, bio, experienceLevel },
      { new: true }
    );
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get trading statistics
router.get('/:id/statistics', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const stats = {
      totalTrades: user.totalTrades,
      winningTrades: user.winningTrades,
      losingTrades: user.losingTrades,
      winRate: user.totalTrades ? ((user.winningTrades / user.totalTrades) * 100).toFixed(2) + '%' : '0%',
      totalProfit: user.totalProfit,
      totalLoss: user.totalLoss,
      netProfit: user.totalProfit - user.totalLoss,
      simulatorBalance: user.simulatorBalance
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
