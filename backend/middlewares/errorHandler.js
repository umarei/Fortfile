const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);

  // Define a structured error response
  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error.';
  const errorDetails = err.details || null;

  res.status(statusCode).json({
    success: false,
    message,
    ...(errorDetails && { details: errorDetails }), // Include additional error details if present
  });
};

module.exports = errorHandler;
