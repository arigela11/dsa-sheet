const express = require('express');
const Topic = require('../models/Topic');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all topics (public)
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single topic by slug
router.get('/:slug', protect, async (req, res) => {
  try {
    const topic = await Topic.findOne({ slug: req.params.slug });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed topics (admin use - protected)
router.post('/seed', protect, async (req, res) => {
  try {
    await Topic.deleteMany({});
    const topics = await Topic.insertMany(req.body.topics);
    res.status(201).json({ count: topics.length, topics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
