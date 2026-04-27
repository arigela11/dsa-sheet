const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // problemId stored as string: "topicId_subtopicIndex_problemIndex"
  completedProblems: {
    type: Map,
    of: Boolean,
    default: {}
  },
  // Store notes per problem
  problemNotes: {
    type: Map,
    of: String,
    default: {}
  },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

// Compound index for fast user progress lookups
progressSchema.index({ userId: 1 });

module.exports = mongoose.model('Progress', progressSchema);
