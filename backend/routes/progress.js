const express = require('express');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get user's progress
router.get('/', protect, async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }
    // Convert Map to plain object for JSON
    res.json({
      completedProblems: Object.fromEntries(progress.completedProblems),
      problemNotes: Object.fromEntries(progress.problemNotes),
      lastUpdated: progress.lastUpdated
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Toggle problem completion
router.post('/toggle', protect, async (req, res) => {
  try {
    const { problemId } = req.body;
    if (!problemId) return res.status(400).json({ message: 'problemId required' });

    let progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) progress = new Progress({ userId: req.user._id });

    const current = progress.completedProblems.get(problemId) || false;
    progress.completedProblems.set(problemId, !current);
    progress.lastUpdated = new Date();
    await progress.save();

    res.json({
      problemId,
      completed: !current,
      completedProblems: Object.fromEntries(progress.completedProblems)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk update progress
router.post('/bulk', protect, async (req, res) => {
  try {
    const { updates } = req.body; // { problemId: boolean }
    let progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) progress = new Progress({ userId: req.user._id });

    Object.entries(updates).forEach(([id, val]) => {
      progress.completedProblems.set(id, val);
    });
    progress.lastUpdated = new Date();
    await progress.save();

    res.json({ completedProblems: Object.fromEntries(progress.completedProblems) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
