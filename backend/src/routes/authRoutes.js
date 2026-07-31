/**
 * ==========================================================
 * Authentication Routes
 * ----------------------------------------------------------
 * Handles authentication endpoints.
 * ==========================================================
 */

const express = require("express");
const router = express.Router();


/**
 * Controllers
 */
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");



/**
 * Middlewares
 */
const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");



/**
 * Validators
 */
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");



/**
 * ==========================================================
 * Public Routes
 * ==========================================================
 */


/**
 * Register
 * POST /api/auth/register
 *
 * Validation:
 * - name
 * - email
 * - password
 * - role
 */
router.post(
  "/register",
  validate({
    body: registerSchema,
  }),
  register
);



/**
 * Login
 * POST /api/auth/login
 *
 * Validation:
 * - email
 * - password
 */
router.post(
  "/login",
  validate({
    body: loginSchema,
  }),
  login
);



/**
 * Refresh Access Token
 * POST /api/auth/refresh
 */
router.post(
  "/refresh",
  refreshToken
);



/**
 * Logout
 * POST /api/auth/logout
 */
router.post(
  "/logout",
  logout
);



/**
 * ==========================================================
 * Protected Routes
 * ==========================================================
 */


/**
 * Current Logged-in User
 * GET /api/auth/me
 */
router.get(
  "/me",
  authenticate,
  (req, res) => {

    console.log("========== /me ROUTE HIT ==========");
    console.log("Authenticated User:");
    console.log(req.user);


    return res.status(200).json({
      success: true,
      user: req.user,
    });

  }
);



/**
 * Admin Only Endpoint
 * GET /api/auth/admin
 */
router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {

    console.log("========== /admin ROUTE HIT ==========");
    console.log("Authenticated User:");
    console.log(req.user);


    return res.status(200).json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });

  }
);



module.exports = router;