const express = require('express');
const Strategy = require('../models/Strategy');
const router = express.Router();

// Create strategy
router.post('/', async (req, res) => {
  try {
    const strategy = new Strategy(req.body);
    await strategy.save();
    res.status(201).json({ message: 'Strategy created', strategy });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user strategies
router.get('/user/:userId', async (req, res) => {
  try {
    const strategies = await Strategy.find({ userId: req.params.userId });
    res.json(strategies);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single strategy
router.get('/:id', async (req, res) => {
  try {
    const strategy = await Strategy.findById(req.params.id);
    if (!strategy) return res.status(404).json({ message: 'Strategy not found' });
    res.json(strategy);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update strategy
router.put('/:id', async (req, res) => {
  try {
    const strategy = await Strategy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Strategy updated', strategy });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
