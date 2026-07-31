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

// Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./docs/openapi.yaml");

// Routes
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/order.routes");

// Middlewares
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");


const app = express();



/**
 * Security Headers
 */
app.use(
  helmet()
);



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
app.use(
  compression()
);



/**
 * HTTP Request Logger
 */
app.use(
  morgan("dev")
);



/**
 * Structured Application Logger
 */
app.use(loggerMiddleware);



/**
 * Rate Limiter
 *
 * Protect API from excessive requests.
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
 *
 * Parse JSON and URL encoded requests.
 */
app.use(
  express.json()
);


app.use(
  express.urlencoded({
    extended: true,
  })
);



/**
 * Swagger API Documentation
 *
 * Available at:
 * http://localhost:5000/api-docs
 */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);



/**
 * Health Check
 */
app.get(
  "/health",
  (req, res) => {

    return res.status(200).json({

      success: true,

      message: "TechDent Backend is running",

      timestamp: new Date(),

    });

  }
);



/**
 * API Routes
 */
app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/orders",
  orderRoutes
);



/**
 * 404 Handler
 *
 * Runs when no route matches.
 */
app.use(
  (req, res) => {

    return res.status(404).json({

      success: false,

      message: "Route not found",

    });

  }
);



/**
 * Global Error Handler
 *
 * Must be the last middleware.
 */
app.use(
  errorMiddleware
);



module.exports = app;