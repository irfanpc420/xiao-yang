// API routes for actors
const express = require('express');
const router = express.Router();
const dataLoader = require('../dataLoader');

// Load all actors dynamically
let actors = dataLoader.loadActors();

// API endpoint to get all actors
router.get('/', (req, res) => {
  const actorList = Object.keys(actors).map(id => ({
    id,
    name: actors[id].name,
  }));
  res.json(actorList);
});

// API endpoint to get actor details by ID
router.get('/:id', (req, res) => {
  const actorId = req.params.id;
  if (actors[actorId]) {
    res.json({
      ...actors[actorId],
      image: `/images/${actors[actorId].image}`, // Add image path
    });
  } else {
    res.status(404).json({ error: 'Actor not found' });
  }
});

module.exports = router;
