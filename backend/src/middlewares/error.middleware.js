/**
 * ==========================================================
 * Global Error Middleware
 * ----------------------------------------------------------
 * Centralized error handler for the entire application.
 * Every thrown error eventually reaches this middleware.
 * ==========================================================
 */

const logger = require("../config/logger");
const HTTP_STATUS = require("../utils/httpStatus");

module.exports = (err, req, res, next) => {

  /**
   * Log error
   */
  logger.error(err.stack || err.message);

  /**
   * Default values
   */
  const statusCode =
    err.statusCode ||
    HTTP_STATUS.INTERNAL_SERVER_ERROR;

  const response = {

    success: false,

    message:
      err.message || "Internal Server Error",

    errors:
      err.errors || null,

  };

  /**
   * Show stack only in development
   */
  if (process.env.NODE_ENV === "development") {

    response.stack = err.stack;

  }

  return res
    .status(statusCode)
    .json(response);

};