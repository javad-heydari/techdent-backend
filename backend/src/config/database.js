/**
 * ==========================================================
 * Database Connection
 * ----------------------------------------------------------
 * PostgreSQL connection health check.
 * Prisma manages the connection pool itself.
 * ==========================================================
 */

const prisma = require("../lib/prisma");
const logger = require("./logger");

const connectDB = async () => {

  try {

    await prisma.$queryRaw`SELECT 1`;

    logger.info(
      "✅ PostgreSQL Connected Successfully"
    );

  } catch (err) {

    logger.error(
      `❌ PostgreSQL Connection Error: ${err.message}`
    );

    process.exit(1);

  }

};

module.exports = connectDB;