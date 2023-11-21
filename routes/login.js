const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const member = await Member.findOne({ email });

    
    if (!member) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordMatch = await member.comparePassword(password);
  
    if (isPasswordMatch) {
     
      res.redirect(`/home`);
    } else {
     
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
