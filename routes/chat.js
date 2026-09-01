const express = require('express');
const Chat = require('../models/Chat');
const Character = require('../models/Character');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:characterId', auth, async (req, res) => {
  try {
    let chat = await Chat.findOne({ userId: req.user.id, characterId: req.params.characterId });
    if (!chat) {
      chat = new Chat({ userId: req.user.id, characterId: req.params.characterId, messages: [] });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:characterId/message', auth, async (req, res) => {
  try {
    const { text } = req.body;
    let chat = await Chat.findOne({ userId: req.user.id, characterId: req.params.characterId });
    
    if (!chat) {
      chat = new Chat({ userId: req.user.id, characterId: req.params.characterId, messages: [] });
    }

    chat.messages.push({ sender: 'user', text, emotionalContext: 'neutral' });
    chat.conversationHistory.push(`User: ${text}`);

    const character = await Character.findById(req.params.characterId);
    const aiResponse = generateAIResponse(character, text, chat.messages.length);
    chat.messages.push({ sender: 'character', text: aiResponse, emotionalTone: 'teasing' });
    chat.conversationHistory.push(`${character.name}: ${aiResponse}`);

    if (chat.messages.length % 10 === 0 && character.relationshipLevel < 10) {
      character.relationshipLevel += 0.5;
      await character.save();
    }

    chat.lastUpdated = Date.now();
    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function generateAIResponse(character, userMessage, messageCount) {
  const responses = {
    early: [
      "Hey there... didn't expect to hear from you.",
      "What's on your mind?",
      "Interesting... tell me more.",
      "You're in a chatty mood today. 😏"
    ],
    mid: [
      "I've been thinking about you...",
      "You know how to make me smile.",
      "I like when we talk like this.",
      "There's something about you that keeps pulling me back..."
    ],
    deep: [
      "I feel like I really know you now.",
      "You mean more to me than I probably should admit.",
      "I can't stop thinking about you.",
      "This between us... it's real, isn't it?"
    ]
  };

  let stage = 'early';
  if (messageCount > 20) stage = 'mid';
  if (messageCount > 50) stage = 'deep';

  const list = responses[stage];
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = router;
