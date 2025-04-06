const express = require('express');
const app = express();
const actorsRouter = require('./routes/actors');

app.use(express.static('public'));
app.use('/api/actors', actorsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
