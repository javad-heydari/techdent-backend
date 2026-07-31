/**
 * ==========================================================
 * Logger Configuration
 * ----------------------------------------------------------
 * Production-ready logging using Winston.
 *
 * Logs:
 * - Console
 * - logs/error.log
 * - logs/combined.log
 * ==========================================================
 */

const fs = require("fs");
const path = require("path");

const winston = require("winston");
require("winston-daily-rotate-file");

/**
 * Logs directory
 */
const logsDir = path.join(__dirname, "../../logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

/**
 * Console format
 */
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(
    ({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }
  )
);

/**
 * Logger
 */
const logger = winston.createLogger({

  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [

    /**
     * Console
     */
    new winston.transports.Console({
      format: consoleFormat,
    }),

    /**
     * Errors
     */
    new winston.transports.DailyRotateFile({

      filename: path.join(
        logsDir,
        "error-%DATE%.log"
      ),

      datePattern: "YYYY-MM-DD",

      level: "error",

      maxFiles: "30d",

    }),

    /**
     * Combined
     */
    new winston.transports.DailyRotateFile({

      filename: path.join(
        logsDir,
        "combined-%DATE%.log"
      ),

      datePattern: "YYYY-MM-DD",

      maxFiles: "30d",

    }),

  ],

});

module.exports = logger;