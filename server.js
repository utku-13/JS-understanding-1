const express = require('express');
const app = express();

// Middleware 1: Logging
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request for ${req.url}`);
  next(); // The request moves on to the next middleware function
});

// Middleware 2: Authentication Check
app.use((req, res, next) => {
  const isAuthenticated = true; // Simplified for example
  if (isAuthenticated) {
    next(); // The request moves on to the next middleware function
  } else {
    res.status(403).send('Forbidden'); // The request is stopped here if not authenticated
  }
});

// Middleware 3: Data Processing
app.use((req, res, next) => {
  req.processedData = { userId: 1, data: 'some data' };
  next(); // The request moves on to the next middleware function or route handler
});

// Route Handler: Final Response
app.get('/resource', (req, res) => {
  res.json({
    message: 'Resource accessed successfully',
    data: req.processedData,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
