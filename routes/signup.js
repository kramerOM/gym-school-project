const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newMember = new Member({ email, password });

    
    const savedMember = await newMember.save();

    res.redirect(`/home`);
  } catch (error) {
    console.error('Error saving member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
