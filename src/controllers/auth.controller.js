/**
 * ==========================================================
 * Authentication Controller
 * ----------------------------------------------------------
 * Handles:
 * - Register
 * - Login
 * - Refresh Token
 * - Logout
 *
 * Uses Repository Pattern
 * Controllers never communicate with Prisma directly.
 * ==========================================================
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserRepository = require("../repositories/user.repository");
const SessionRepository = require("../repositories/session.repository");

/**
 * Generate JWT Tokens
 */
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "30m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * ==========================================================
 * Register
 * ==========================================================
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
    });

    const tokens = generateTokens(user);

    await SessionRepository.create({
      refreshToken: tokens.refreshToken,

      userId: user.id,

      userAgent: req.headers["user-agent"] || null,

      ipAddress: req.ip,

      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    return res.status(201).json({
      success: true,

      accessToken: tokens.accessToken,

      refreshToken: tokens.refreshToken,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * ==========================================================
 * Login
 * ==========================================================
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.findByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const tokens = generateTokens(user);

    await SessionRepository.create({
      refreshToken: tokens.refreshToken,

      userId: user.id,

      userAgent: req.headers["user-agent"] || null,

      ipAddress: req.ip,

      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    return res.status(200).json({
      success: true,

      accessToken: tokens.accessToken,

      refreshToken: tokens.refreshToken,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * ==========================================================
 * Refresh Token
 * ==========================================================
 */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const session =
      await SessionRepository.findByRefreshToken(refreshToken);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (!session.isValid) {
      return res.status(401).json({
        success: false,
        message: "Session revoked",
      });
    }

    const tokens = generateTokens(session.user);

    await SessionRepository.invalidate(refreshToken);

    await SessionRepository.create({
      refreshToken: tokens.refreshToken,

      userId: session.user.id,

      userAgent: req.headers["user-agent"] || null,

      ipAddress: req.ip,

      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    return res.status(200).json({
      success: true,

      accessToken: tokens.accessToken,

      refreshToken: tokens.refreshToken,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

/**
 * ==========================================================
 * Logout
 * ==========================================================
 */
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await SessionRepository.invalidate(refreshToken);
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};