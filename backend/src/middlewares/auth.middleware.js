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
const { failure } = require("../utils/response");
const { verifyAccessToken } = require("../utils/token");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return failure(
        res,
        "Authorization header is missing",
        401
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      return failure(
        res,
        "Invalid authorization format",
        401
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return failure(
        res,
        "Access token is missing",
        401
      );
    }

    const payload = verifyAccessToken(token);

    const user = await userRepository.findById(payload.id);

    if (!user) {
      return failure(res, "User not found", 401);
    }

    req.user = user;

    next();
  } catch (err) {
    return failure(
      res,
      "Invalid or expired access token",
      401
    );
  }
};

module.exports = authenticate;