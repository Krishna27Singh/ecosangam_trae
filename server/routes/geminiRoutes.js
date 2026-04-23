const express = require('express');
const router = express.Router();
const { undoImpact } = require('../controllers/geminiController');

router.post('/', undoImpact);

module.exports = router;
