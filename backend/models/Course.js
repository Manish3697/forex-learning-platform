const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['basics', 'intermediate', 'advanced', 'psychology', 'riskManagement', 'strategies'],
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  instructor: String,
  duration: Number, // in minutes
  videoUrl: String,
  imageUrl: String,
  modules: [{
    moduleId: mongoose.Schema.Types.ObjectId,
    title: String,
    lessonCount: Number
  }],
  lessons: [{
    lessonId: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    videoUrl: String,
    keyPoints: [String],
    examples: [String],
    quiz: [{
      question: String,
      options: [String],
      correctAnswer: String
    }]
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  enrollments: {
    type: Number,
    default: 0
  },
  prerequisites: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
