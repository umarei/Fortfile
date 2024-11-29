const express = require('express');
const dotenv = require('./config/dotenv'); // Enhanced dotenv loader
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

// Load environment variables
dotenv();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } })); // Log HTTP requests
app.use(helmet()); // Add security headers
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));

// Root Route (Default)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the FortFile API!',
    endpoints: {
      auth: '/api/auth',
      files: '/api/files',
      roles: '/api/roles',
    },
  });
});

// Catch-All Route for Undefined Endpoints
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: `Cannot find ${req.originalUrl} on this server.` });
});

// Error Handling Middleware
app.use(require('./middlewares/errorHandler'));

// Graceful Shutdown Handler
process.on('SIGINT', async () => {
  logger.info('Gracefully shutting down...');
  await mongoose.connection.close();
  logger.info('MongoDB connection closed.');
  process.exit(0);
});

// Server Listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
