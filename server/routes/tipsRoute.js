const express = require("express");
const router = express.Router();
const { getTip } = require("../controllers/tipsController");

router.post("/", getTip);

module.exports = router;
