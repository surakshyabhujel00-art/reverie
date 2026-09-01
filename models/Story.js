const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Character' },
  title: String,
  content: String,
  tags: [String],
  comments: [{
    characterId: mongoose.Schema.Types.ObjectId,
    characterName: String,
    text: String,
    timestamp: { type: Date, default: Date.now },
    emotionalTone: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
