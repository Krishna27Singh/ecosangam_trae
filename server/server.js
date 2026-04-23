const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const passportSetup = require('./config/passport');
const cors = require('cors');
// const session = require('express-session'); // <-- COMMENTED OUT: We are using JWTs instead of server sessions
const passport = require('passport');
// const cookieParser = require('cookie-parser'); // <-- COMMENTED OUT: We no longer rely on cookies for auth
const bodyParser = require('body-parser');
const ecoGoalRoutes = require('./routes/ecoGoalRoutes');
const tipsRoute = require("./routes/tipsRoute");
const geminiRoutes = require('./routes/geminiRoutes');
// const reportRoutes = require('./routes/reportRoutes.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.set('trust proxy', 1);

app.use(express.json());
// app.use(cookieParser()); // <-- COMMENTED OUT: Middleware no longer needed
app.use(cors({
  // Note: I added process.env.FRONTEND_URL here to ensure your production auth redirects work!
  origin: [process.env.FRONTEND_URL || "http://localhost:5175", "https://ecosangam.onrender.com"],
  credentials: true // You can actually comment this out too with JWTs, but it's safe to leave it.
}));

// const isProduction = process.env.NODE_ENV === 'production'; // <-- COMMENTED OUT: Was only used for cookie security

// Session setup
// <-- COMMENTED OUT ENTIRE BLOCK: Your server is now beautifully stateless! -->
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: isProduction, // MUST be true on Render, false on localhost
//     sameSite: isProduction ? 'none' : 'lax', // 'none' allows cross-domain on Render
//     maxAge: 24 * 60 * 60 * 1000 // 1 day
//   }
// }));

// Passport setup
app.use(passport.initialize()); // <-- REQUIRED: Must stay active to handle the initial Google OAuth click
// app.use(passport.session()); // <-- COMMENTED OUT: Passport no longer needs to hook into express-session

app.use('/auth', authRoutes);
// app.use("/api/reports", reportRoutes);

app.use(bodyParser.json());

app.use('/completedecogoal', ecoGoalRoutes);
app.use('/api/gemini', geminiRoutes);
app.use("/api/tips", tipsRoute);
console.log("✅ /test route registered");
app.get('/test', (req, res) => {
  res.send("test is fine");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});