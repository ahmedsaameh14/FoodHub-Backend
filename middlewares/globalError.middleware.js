const AppError = require('../utils/app-error.util');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle MongoDB Cast Error
  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new AppError(message, 400);
  }

  // Handle MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} Already Exist`;
    err = new AppError(message, 400);
  }

  // Handle MongoDB Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(e => e.message)
      .join(', ');
    err = new AppError(message, 400);
  }

  // Handle JWT Errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid Token';
    err = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token Expired';
    err = new AppError(message, 401);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};