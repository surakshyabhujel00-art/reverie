const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true },
  messages: [{
    sender: { type: String, enum: ['user', 'character'] },
    text: String,
    timestamp: { type: Date, default: Date.now },
    emotionalContext: String
  }],
  conversationHistory: [String],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
