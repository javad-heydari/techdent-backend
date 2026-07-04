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

/**
 * Register
 */
exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      ...result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Login
 */
exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Refresh Access Token
 */
exports.refreshToken = async (req, res) => {
  try {
    const result = await authService.refresh(req.body);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Logout
 */
exports.logout = async (req, res) => {
  try {
    const result = await authService.logout(req.body);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};