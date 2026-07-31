/**
 * ==========================================
 * Prisma Client Singleton
 * ------------------------------------------
 * This file exports a single Prisma Client
 * instance for the whole application.
 *
 * Prevents multiple database connections
 * during development (nodemon / hot reload).
 * ==========================================
 */

const { PrismaClient } = require("@prisma/client");

/**
 * Create Prisma Client
 */
const prisma = new PrismaClient({
  log: ["error", "warn"],
});

/**
 * Export singleton instance
 */
module.exports = prisma;