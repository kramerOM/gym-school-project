const express = require('express');

const StaffModel = require('../models/staffmodels');


const router = express.Router();



router.post('/staff', async (req, res) => {
  try {
    const { staffId, password } = req.body;
    const staff = await StaffModel.findOne({ staffId });

    if (!staff) {
      return res.status(401).json({ error: 'Invalid Staff ID' });
    }

    if (password !== staff.password) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    res.redirect(`/staffdashboard`);
  } catch (error) {
    console.error('Error during staff login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
