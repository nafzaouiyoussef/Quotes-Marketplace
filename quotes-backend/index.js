const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const quotesRoutes = require('./routes/quotes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', quotesRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
