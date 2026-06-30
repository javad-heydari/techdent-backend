/**
 * APP CONFIGURATION
 * Production Ready Express Application
 */

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/order.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

/**
 * Security Headers
 */
app.use(helmet());

/**
 * Enable CORS
 */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/**
 * Compress Response
 */
app.use(compression());

/**
 * HTTP Request Logger
 */
app.use(morgan("dev"));

/**
 * Rate Limiter
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

/**
 * Body Parser
 */
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * Health Check
 */
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "TechDent Backend is running",
    timestamp: new Date(),
  });
});

/**
 * API Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

/**
 * 404 Handler
 */
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global Error Handler
 */
app.use(errorMiddleware);

module.exports = app;