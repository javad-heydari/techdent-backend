/**
 * ==========================================
 * Database Connection
 * ------------------------------------------
 * PostgreSQL connection health check.
 *
 * Prisma manages the connection pool itself.
 * We only verify that the database is reachable
 * when the application starts.
 * ==========================================
 */

const prisma = require("../lib/prisma");

/**
 * Test database connectivity.
 */
const connectDB = async () => {
  try {
    // Execute a lightweight query
    await prisma.$queryRaw`SELECT 1`;

    console.log("✅ PostgreSQL Connected Successfully");
  } catch (err) {
    console.error("❌ PostgreSQL Connection Error");
    console.error(err);

    process.exit(1);
  }
};

module.exports = connectDB;