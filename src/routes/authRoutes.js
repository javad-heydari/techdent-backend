/**
 * AUTH ROUTES (FULL VERSION)
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
 * REGISTER USER
 * POST /api/auth/register
 */
router.post("/register", register);

/**
 * LOGIN USER
 * POST /api/auth/login
 */
router.post("/login", login);

/**
 * REFRESH TOKEN
 * POST /api/auth/refresh
 */
router.post("/refresh", refreshToken);

/**
 * LOGOUT USER
 * POST /api/auth/logout
 */
router.post("/logout", logout);

module.exports = router;