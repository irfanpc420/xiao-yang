const fs = require('fs');
const path = require('path');

function getActorInfo(actorName) {
  const filePath = path.join(__dirname, '..', 'Info', `${actorName}.js`);
  if (fs.existsSync(filePath)) {
    return require(filePath);
  }
  return null;
}

function getAllActors() {
  const infoPath = path.join(__dirname, '..', 'Info');
  return fs.readdirSync(infoPath)
    .filter(file => file.endsWith('.js'))
    .map(file => file.replace('.js', ''));
}

module.exports = { getActorInfo, getAllActors };
