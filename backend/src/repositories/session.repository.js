/**
 * ==========================================================
 * Session Repository
 * ----------------------------------------------------------
 * Handles all Session database operations.
 * ==========================================================
 */

const prisma = require("../lib/prisma");

/**
 * Create session
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
 * Update session
 */
const update = async (id, data) => {
  return prisma.session.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Delete session by refresh token
 */
const deleteByRefreshToken = async (refreshToken) => {
  return prisma.session.deleteMany({
    where: {
      refreshToken,
    },
  });
};

/**
 * Delete all user sessions
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
  update,
  deleteByRefreshToken,
  deleteAllByUserId,
  invalidate,
};