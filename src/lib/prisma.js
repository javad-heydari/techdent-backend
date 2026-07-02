/**
 * Prisma Client Singleton
 * Prevents multiple connections in dev hot-reload
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

module.exports = prisma;