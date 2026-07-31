/**
 * APPLICATION ERROR CLASS
 *
 * Custom error object for expected application errors.
 * This helps the global error middleware
 * return consistent API responses.
 */

class AppError extends Error {
  constructor(message, statusCode = 500, errors = []) {

    super(message);

    // HTTP status code
    this.statusCode = statusCode;

    // Additional validation or error details
    this.errors = errors;

    // Identify operational errors
    this.isOperational = true;

    // Maintain proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;