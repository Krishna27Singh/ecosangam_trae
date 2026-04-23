const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { signup, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// Set dynamic frontend URL based on environment
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5175';

// Local Auth
router.post('/signup', signup);
router.post('/login', login);

// Fetch the full user from the database using the ID in the token
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user); 
  } catch (err) {
    console.error("Error fetching user in /me route:", err.message);
    res.status(500).send('Server Error');
  }
});

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}`, // Updated to use dynamic URL
    session: false
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    
    // Updated to use dynamic URL
    res.redirect(`${FRONTEND_URL}/home?token=${token}`); 
  }
);

router.put('/update_profile', auth, async (req, res) => {
  try {
    const { name, email, location } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { name, email, location }, 
      { new: true } 
    ).select('-password'); 

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error updating profile' });
  }
});

module.exports = router;