const express = require('express');
const Glossary = require('../models/Glossary');
const router = express.Router();

// Get all glossary terms
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const terms = await Glossary.find(filter).sort({ term: 1 });
    res.json(terms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Search glossary
router.get('/search/:query', async (req, res) => {
  try {
    const results = await Glossary.find({
      $text: { $search: req.params.query }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single term
router.get('/term/:id', async (req, res) => {
  try {
    const term = await Glossary.findById(req.params.id);
    if (!term) return res.status(404).json({ message: 'Term not found' });
    res.json(term);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
