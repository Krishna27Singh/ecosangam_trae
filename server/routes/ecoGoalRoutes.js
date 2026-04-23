const express = require('express');
const { completeEcoGoal } = require('../controllers/ecoGoalController');

const router = express.Router();

console.log("eco goal routes loaded")
router.post('/', completeEcoGoal);
router.get('/test', (req, res) => {
  res.send("EcoGoal route is working");
});

module.exports = router;
