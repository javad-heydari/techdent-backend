/**
 * JWT Utility
 * Responsible for generating access & refresh tokens
 */

const jwt = require("jsonwebtoken");

/**
 * Generate Access Token (short-lived)
 * Used for API authentication
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m", // short life for security
    }
  );
};

/**
 * Generate Refresh Token (long-lived)
 * Used to refresh access token without login again
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d", // long life
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};