index.js/**
 * ==========================================================
 * Central Configuration
 * ----------------------------------------------------------
 * All environment variables should be accessed
 * through this file.
 *
 * Never use process.env directly
 * outside the config layer.
 * ==========================================================
 */

module.exports = {

  server: {

    port: Number(process.env.PORT || 5000),

    env: process.env.NODE_ENV || "development",

  },



  database: {

    url: process.env.DATABASE_URL,

  },



  jwt: {

    accessSecret: process.env.JWT_ACCESS_SECRET,

    refreshSecret: process.env.JWT_REFRESH_SECRET,

    accessExpires:

      process.env.ACCESS_TOKEN_EXPIRES,

    refreshExpires:

      process.env.REFRESH_TOKEN_EXPIRES,

  },



  swagger: {

    enabled:

      process.env.SWAGGER_ENABLED !== "false",

  },



  log: {

    level:

      process.env.LOG_LEVEL || "info",

  },

};