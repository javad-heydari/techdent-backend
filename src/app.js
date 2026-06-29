/**
 * TechDent App Configuration
 * Central Express application setup
 */

console.log("🔥 LOADING THIS APP.JS:", __filename);

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Routes
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/**
 * =========================
 * MIDDLEWARES
 * =========================
 */

// Security
app.use(cors());
app.use(helmet());

// Logger
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// Cookie parser (for refresh token auth)
app.use(cookieParser());

/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "TechDent Backend Running 🚀",
  });
});

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

/**
 * =========================
 * 404 HANDLER
 * =========================
 */
app.use((req, res) => {
  res.status(404).json({
    status: "ERROR",
    message: "Route not found",
  });
});

/**
 * =========================
 * GLOBAL ERROR HANDLER
 * =========================
 */
const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

// IMPORTANT: must be LAST middleware
app.use(errorHandler);

module.exports = app;