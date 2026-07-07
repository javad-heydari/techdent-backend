/**
 * ==========================================================
 * Authentication Middleware
 * ----------------------------------------------------------
 * Verifies JWT Access Token.
 *
 * Responsibilities:
 * - Read Authorization header
 * - Verify JWT
 * - Load authenticated user
 * - Attach user to req.user
 * ==========================================================
 */

const userRepository = require("../repositories/user.repository");

const {
  verifyAccessToken,
} = require("../utils/token");

/**
 * Authentication Middleware
 */
const authenticate = async (req, res, next) => {
  try {
    // Read Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    // Expected format:
    // Bearer <token>
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing",
      });
    }

    // Verify access token
    const payload = verifyAccessToken(token);

    // Load latest user from database
    const user = await userRepository.findById(payload.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach authenticated user to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

module.exports = authenticate;