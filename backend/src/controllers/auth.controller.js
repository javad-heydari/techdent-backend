/**
 * ==========================================================
 * Auth Controller
 * ----------------------------------------------------------
 * Thin Controller
 *
 * Responsibilities:
 * - Read request data
 * - Call AuthService
 * - Return HTTP response
 *
 * Business logic MUST stay inside AuthService.
 * ==========================================================
 */

const authService = require("../services/auth.service");

const {
  success,
  created,
  failure,
} = require("../utils/response");

/**
 * ==========================================================
 * Register
 * ==========================================================
 */
exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    return created(
      res,
      result,
      "User registered successfully"
    );

  } catch (err) {

    return failure(
      res,
      err.message,
      400
    );

  }
};


/**
 * ==========================================================
 * Login
 * ==========================================================
 */
exports.login = async (req, res) => {
  try {

    const result =
      await authService.login(req.body);

    return success(
      res,
      result,
      "Login successful"
    );

  } catch (err) {

    return failure(
      res,
      err.message,
      401
    );

  }
};


/**
 * ==========================================================
 * Refresh Token
 * ==========================================================
 */
exports.refreshToken = async (req, res) => {
  try {

    const result =
      await authService.refresh(req.body);

    return success(
      res,
      result,
      "Token refreshed"
    );

  } catch (err) {

    return failure(
      res,
      err.message,
      401
    );

  }
};


/**
 * ==========================================================
 * Logout
 * ==========================================================
 */
exports.logout = async (req, res) => {
  try {

    const result =
      await authService.logout(req.body);

    return success(
      res,
      result,
      "Logout successful"
    );

  } catch (err) {

    return failure(
      res,
      err.message,
      400
    );

  }
};