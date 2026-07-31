/**
 * ==========================================================
 * Auth Service
 * ----------------------------------------------------------
 * Contains all authentication business logic.
 * Controllers should NEVER access repositories directly.
 * ==========================================================
 */

const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/user.repository");
const sessionRepository = require("../repositories/session.repository");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/token");

/**
 * Refresh Token Lifetime
 * (7 Days)
 */
const REFRESH_TOKEN_EXPIRES_MS =
  7 * 24 * 60 * 60 * 1000;

/**
 * Register new user
 */
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

    // Refresh token expiration
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

/**
 * Login user
 */
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

    // Refresh token expiration
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

/**
 * Refresh access token
 */
const refresh = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  console.log("========== REFRESH ==========");
  console.log("Incoming Refresh:", refreshToken);

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
    console.log("Payload:", payload);
  } catch (err) {
    console.log("JWT Verify Error:", err.message);
    throw new Error("Invalid or expired refresh token");
  }

  const session =
    await sessionRepository.findByRefreshToken(
      refreshToken
    );

  console.log("Session:", session);

  if (!session) {
    throw new Error("Session not found");
  }

  if (!session.isValid) {
    throw new Error("Session revoked");
  }

  const user = await userRepository.findById(
    payload.id
  );

  console.log("User:", user);

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken =
    generateRefreshToken(user);

  /**
   * Remove old refresh token
   */
  await sessionRepository.deleteByRefreshToken(
    refreshToken
  );

  /**
   * Create new session
   */
  await sessionRepository.create({
    userId: user.id,
    refreshToken: newRefreshToken,

    expiresAt: new Date(
      Date.now() + REFRESH_TOKEN_EXPIRES_MS
    ),
  });

  console.log(
    "Refresh completed successfully"
  );

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * Logout user
 */
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