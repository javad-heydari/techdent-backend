/**
 * ==========================================================
 * Session Repository
 * ----------------------------------------------------------
 * Handles all database operations related to user sessions.
 *
 * One user can have multiple active sessions.
 *
 * Examples:
 * - Laptop
 * - Mobile
 * - Tablet
 *
 * Controllers must never access Prisma directly.
 * ==========================================================
 */

const prisma = require("../lib/prisma");

/**
 * Create new session
 */
const create = async (data) => {
  return prisma.session.create({
    data,
  });
};

/**
 * Find session by refresh token
 */
const findByRefreshToken = async (refreshToken) => {
  return prisma.session.findUnique({
    where: {
      refreshToken,
    },
    include: {
      user: true,
    },
  });
};

/**
 * Delete one session
 */
const deleteByRefreshToken = async (refreshToken) => {
  return prisma.session.deleteMany({
    where: {
      refreshToken,
    },
  });
};

/**
 * Delete all sessions for a user
 */
const deleteAllByUserId = async (userId) => {
  return prisma.session.deleteMany({
    where: {
      userId,
    },
  });
};

/**
 * Invalidate session
 */
const invalidate = async (refreshToken) => {
  return prisma.session.updateMany({
    where: {
      refreshToken,
    },
    data: {
      isValid: false,
    },
  });
};

module.exports = {
  create,
  findByRefreshToken,
  deleteByRefreshToken,
  deleteAllByUserId,
  invalidate,
};