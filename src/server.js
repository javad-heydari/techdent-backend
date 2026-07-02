/**
 * TechDent Backend Entry Point
 * Clean Postgres-ready version
 */

require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const app = require("./app");
const connectDB = require("./config/database");

/**
 * Initialize database connection
 */
connectDB();

const PORT = process.env.PORT || 5000;

/**
 * Start HTTP server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});