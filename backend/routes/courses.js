const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category, level } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (level) filter.level = level;

    const courses = await Course.find(filter);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create course (admin)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, level, instructor, duration } = req.body;
    const course = new Course({
      title,
      description,
      category,
      level,
      instructor,
      duration
    });
    await course.save();
    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
