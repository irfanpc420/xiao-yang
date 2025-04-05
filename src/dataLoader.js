const fs = require('fs');
const path = require('path');

// Function to load all actor data from the Info folder
function loadActors() {
  const actorsDir = path.join(__dirname, '../Info');
  const actorFiles = fs.readdirSync(actorsDir);
  const actors = [];

  actorFiles.forEach(file => {
    const actor = require(path.join(actorsDir, file));
    actors.push(actor);
  });

  return actors;
}

module.exports = { loadActors };
