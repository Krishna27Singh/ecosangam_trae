const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// 1. Set dynamic backend URL based on environment
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? process.env.BACKEND_URL // E.g., https://ecosangam-backend.onrender.com
  : 'http://localhost:8890';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  // Use a relative path! Passport will automatically prepend the correct domain.
  callbackURL: '/auth/google/callback', 
  proxy: true // This guarantees it uses 'https' on Render
}, async (accessToken, refreshToken, profile, done) => {
  // ... rest of your code stays the exact same
  try {
    const email = profile.emails[0].value;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name: profile.displayName,
        email,
        password: 'google-auth' // dummy value
      });
      await user.save();
    }
    return done(null, user);
  } catch (error) {
    return done(error, null); // Added try/catch block for safety in production
  }
}));