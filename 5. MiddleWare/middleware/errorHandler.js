const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500; // Default to 500 for server errors
  const errorMessage = err.message || 'Internal Server Error';

  console.error(err.stack); // Log the error for debugging

  res.status(statusCode).json({
    error: {
      message: errorMessage,
      statusCode,
    },
  });
};

module.exports = errorHandler;
