const express = require('express');
const router = express.Router();
const dataLoader = require('../dataLoader');

// Get list of all actors
router.get('/', (req, res) => {
  const actors = dataLoader.loadActors();
  res.json(actors);
});

module.exports = router;
