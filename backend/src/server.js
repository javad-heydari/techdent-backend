/**
 * ==========================================================
 * TechDent Backend Entry Point
 * ==========================================================
 */

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");
const logger = require("./config/logger");

/**
 * Bootstrap server
 */
const startServer = async () => {

  try {

    await connectDB();

    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {

      logger.info(
        `🚀 TechDent API started on port ${PORT}`
      );

    });

    /**
     * Graceful Shutdown
     */
    const shutdown = (signal) => {

      logger.info(
        `${signal} received. Shutting down server...`
      );

      server.close(() => {

        logger.info(
          "HTTP Server Closed."
        );

        process.exit(0);

      });

    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    /**
     * Unhandled Promise Rejection
     */
    process.on("unhandledRejection", (err) => {

      logger.error(err.stack || err);

      shutdown("UnhandledRejection");

    });

    /**
     * Uncaught Exception
     */
    process.on("uncaughtException", (err) => {

      logger.error(err.stack || err);

      process.exit(1);

    });

  } catch (err) {

    logger.error(err.stack || err);

    process.exit(1);

  }

};

startServer();