/**
 * ==========================================================
 * Auth Service
 * ----------------------------------------------------------
 * Contains all authentication business logic.
 * Controllers should NEVER access repositories directly.
 * ==========================================================
 */

const logger = require("../config/logger");
const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/user.repository");
const sessionRepository = require("../repositories/session.repository");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/token");

const REFRESH_TOKEN_EXPIRES_MS =
  7 * 24 * 60 * 60 * 1000;

const register = async ({ name, email, password, role }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.create({
    name,
    email,
    password: hashedPassword,
    role: role || "USER",
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await sessionRepository.create({
    userId: user.id,
    refreshToken,

    expiresAt: new Date(
      Date.now() + REFRESH_TOKEN_EXPIRES_MS
    ),
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await sessionRepository.create({
    userId: user.id,
    refreshToken,

    expiresAt: new Date(
      Date.now() + REFRESH_TOKEN_EXPIRES_MS
    ),
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const refresh = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  logger.info("Refresh token received");

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (err) {
    logger.error("JWT Verify Error:", err.message);
    throw new Error("Invalid or expired refresh token");
  }

  const session =
    await sessionRepository.findByRefreshToken(
      refreshToken
    );

  if (!session) {
    throw new Error("Session not found");
  }

  if (!session.isValid) {
    throw new Error("Session revoked");
  }

  const user = await userRepository.findById(
    payload.id
  );

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken =
    generateRefreshToken(user);

  await sessionRepository.deleteByRefreshToken(
    refreshToken
  );

  await sessionRepository.create({
    userId: user.id,
    refreshToken: newRefreshToken,

    expiresAt: new Date(
      Date.now() + REFRESH_TOKEN_EXPIRES_MS
    ),
  });

  logger.info("Token refreshed successfully");

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

const logout = async ({ refreshToken }) => {
  await sessionRepository.invalidate(
    refreshToken
  );

  return {
    message: "Logged out successfully",
  };
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};