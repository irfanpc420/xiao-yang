// Main server file
const express = require('express');
const actorsRoute = require('./routes/actors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// API routes for actors
app.use('/api/actors', actorsRoute);

// Prevent access to source code folders
app.use('/src', (req, res) => {
  res.status(403).send('Access to source code is forbidden.');
});
app.use('/Info', (req, res) => {
  res.status(403).send('Access to source code is forbidden.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
