const express = require('express');
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/authentication.routes').routes;
const mealRoutes = require('./src/routes/meal.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to log HTTP methods
app.all('*', (req, res, next) => {
  const method = req.method;
  console.log('Method:', method);
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use(userRoutes);
app.use('/api/auth', authRoutes);
app.use(mealRoutes);

// info route
app.get('/api/info', (req, res) => {
  console.log('GET /api/info')
  const info = {
      nameOfStudent: 'Mikail Sari',
      studentId: '2215079',
      description: 'Dit is een API app gemaakt op maaltijden te plannen.'
  }
  res.json(info)
})

// Welcome message for the root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the API',
  });
});

// Route not found handler
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
    data: {},
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
