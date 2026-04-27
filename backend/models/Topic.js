const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  youtubeLink: { type: String, default: '' },
  leetcodeLink: { type: String, default: '' },
  articleLink: { type: String, default: '' },
  notes: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

const subtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  problems: [problemSchema],
  order: { type: Number, default: 0 }
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '📚' },
  color: { type: String, default: '#6366f1' },
  subtopics: [subtopicSchema],
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Indexes for performance
topicSchema.index({ slug: 1 });
topicSchema.index({ order: 1 });

module.exports = mongoose.model('Topic', topicSchema);
