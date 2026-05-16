const mongoose = require('mongoose');

const glossarySchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    unique: true
  },
  definition: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['basic', 'intermediate', 'advanced', 'orderTypes', 'indicators', 'strategies', 'riskManagement'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  example: String,
  relatedTerms: [String],
  videoUrl: String,
  imageUrl: String,
  detailedExplanation: String,
  practicalApplication: String,
  commonMistakes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create text index for searching
glossarySchema.index({ term: 'text', definition: 'text', detailedExplanation: 'text' });

module.exports = mongoose.model('Glossary', glossarySchema);
