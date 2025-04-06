const express = require('express');
const router = express.Router();
const { getActorInfo, getAllActors } = require('../dataLoader');

router.get('/', (req, res) => {
  const actors = getAllActors();
  const actorData = actors.map(name => {
    const data = getActorInfo(name);
    return {
      name,
      image: data.image,
    };
  });
  res.json(actorData);
});

router.get('/:name', (req, res) => {
  const actor = getActorInfo(req.params.name);
  if (actor) res.json(actor);
  else res.status(404).send('Actor not found');
});

module.exports = router;
