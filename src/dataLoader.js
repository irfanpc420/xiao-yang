// Data loader for actors
const fs = require('fs');
const path = require('path');

function loadActors() {
  const infoDir = path.join(__dirname, '../Info'); // Path to the Info folder
  const actors = {};

  // Read all files in the Info folder
  fs.readdirSync(infoDir).forEach(file => {
    const actorId = file.split('.')[0]; // Remove .js extension
    actors[actorId] = require(path.join(infoDir, file)); // Load the actor data
  });

  return actors;
}

module.exports = { loadActors };
