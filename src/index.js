const express = require('express');
const path = require('path');
const dataLoader = require('./dataLoader');
const app = express();
const port = 3000;

// Middleware for serving static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint for fetching actor data
app.get('/api/actors', (req, res) => {
  const actors = dataLoader.loadActors();
  res.json(actors);
});

// Fallback route to serve index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
