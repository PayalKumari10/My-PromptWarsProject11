const mongoose = require('mongoose');

const DayObjectSchema = new mongoose.Schema({
  day: Number,
  dayPart: String,
  topic: String,
  concepts: [String],
  problem: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const RoadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  duration: Number,
  difficulty: String,
  topics: [String],
  days: [DayObjectSchema]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', RoadmapSchema);
