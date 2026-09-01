const express = require('express');
const Character = require('../models/Character');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { name, bio, personality, relationship, traits } = req.body;
    const character = new Character({
      userId: req.user.id,
      name,
      bio,
      personality,
      relationship,
      traits,
      relationshipLevel: 1
    });
    await character.save();
    res.json(character);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const characters = await Character.find({ userId: req.user.id });
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.json(character);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
