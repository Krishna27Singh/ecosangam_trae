const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const ecoGoalRoutes = require('./routes/ecoGoalRoutes');
const tipsRoute = require("./routes/tipsRoute");
const geminiRoutes = require('./routes/geminiRoutes');
const ecoScannerRoutes = require('./routes/ecoScannerRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

app.use(cors({
  origin: "http://localhost:5175"
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5175");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/completedecogoal', ecoGoalRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/tips', tipsRoute);
app.use('/api/eco-scanner', ecoScannerRoutes);

app.get('/test', (req, res) => {
  res.send("test is fine");
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();