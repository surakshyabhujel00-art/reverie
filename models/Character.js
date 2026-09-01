const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  avatar: String,
  bio: String,
  personality: String,
  relationship: String,
  relationshipLevel: { type: Number, default: 1, min: 1, max: 10 },
  memories: [{
    date: Date,
    summary: String,
    emotionalTone: String
  }],
  traits: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Character', characterSchema);
