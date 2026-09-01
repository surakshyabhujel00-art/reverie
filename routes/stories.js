const express = require('express');
const Story = require('../models/Story');
const Character = require('../models/Character');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { title, content, characterId, tags } = req.body;
    const story = new Story({
      userId: req.user.id,
      characterId,
      title,
      content,
      tags
    });
    await story.save();
    
    if (characterId) {
      const character = await Character.findById(characterId);
      const aiComment = generateAIComment(character, content);
      story.comments.push({
        characterId,
        characterName: character.name,
        text: aiComment,
        emotionalTone: 'supportive'
      });
      await story.save();
    }
    
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const stories = await Story.find({ userId: req.user.id }).populate('characterId');
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/feed/all', async (req, res) => {
  try {
    const stories = await Story.find().populate('userId', 'username avatar').populate('characterId', 'name avatar');
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function generateAIComment(character, storyContent) {
  const comments = [
    `Wow, I loved reading this... the way you wrote it reminds me of us.`,
    `You have such a way with words. It made me smile thinking about you.`,
    `This is beautiful... especially that part. Made my heart skip a beat.`,
    `I could picture this so clearly. Were you thinking of me when you wrote it? 😏`,
    `This is sweet, but I think our story would be even better...`
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

module.exports = router;
