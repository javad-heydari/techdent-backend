/**
 * DATABASE CONNECTION (PRISMA VERSION)
 * ------------------------------------
 * Replaces MongoDB/Mongoose completely
 */

const prisma = require("../lib/prisma");

/**
 * Test DB connection
 */
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL Connected via Prisma");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;