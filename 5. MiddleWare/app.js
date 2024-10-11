const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/config.db');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { swaggerUi, specs } = require('./config/swagger');

const app = express();
const port = 5000;

/** Custom error handler */
app.use(errorHandler);

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Custom logging middleware
app.use(logger);

// Parse JSON bodies
app.use(express.json());

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Book routes with validation middleware
app.use('/books', bookRoutes);

// Author routes with validation middleware
app.use('/authors', authorRoutes);

// Category routes with validation middleware
app.use('/categories', categoryRoutes);

// Connect to MongoDB
connectDB().catch(console.dir);

/** Wildcard route for undefined paths */
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
