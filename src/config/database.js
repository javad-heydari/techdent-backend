/**
 * DATABASE CONNECTION (POSTGRES READY)
 * Clean architecture version
 */

const { Pool } = require("pg");

/**
 * Create Postgres pool
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Connect DB function
 */
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected Successfully");
    client.release();
  } catch (err) {
    console.error("❌ PostgreSQL Connection Error:", err.message);
    process.exit(1);
  }
};

/**
 * IMPORTANT:
 * Export function directly (fixes your crash)
 */
module.exports = connectDB;

/**
 * Optional export for pool (advanced usage later)
 */
module.exports.pool = pool;