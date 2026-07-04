/**
 * ==========================================================
 * JWT Utility
 * ----------------------------------------------------------
 * Responsible for generating and verifying JWT tokens.
 * This module should be the only place using jsonwebtoken.
 * ==========================================================
 */

const jwt = require("jsonwebtoken");

/**
 * Generate Access Token
 * Short-lived token used for authenticated requests.
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "30m",
    }
  );
};

/**
 * Generate Refresh Token
 * Long-lived token used to obtain new access tokens.
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
    }
  );
};

/**
 * Verify Refresh Token
 * Returns decoded payload if token is valid.
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};