const express = require('express');
const multer = require('multer');
const { scanEcoImage } = require('../controllers/ecoScannerController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }
});

router.post('/scan', upload.single('image'), scanEcoImage);

module.exports = router;
