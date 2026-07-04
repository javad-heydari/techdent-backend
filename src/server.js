/**
 * TechDent Backend Entry Point
 * Docker-native + Production ready
 */

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

/**
 * Connect to database
 */
connectDB();

const PORT = process.env.PORT || 5000;

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});