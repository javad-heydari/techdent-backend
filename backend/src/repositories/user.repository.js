/**
 * ==========================================================
 * User Repository
 * ----------------------------------------------------------
 * Handles all database operations related to users.
 *
 * IMPORTANT:
 * Controllers and Services must NEVER access Prisma directly.
 * All database operations must go through repositories.
 * ==========================================================
 */

const prisma = require("../lib/prisma");

/**
 * Find user by email
 * @param {string} email
 */
const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

/**
 * Find user by id
 * @param {string} id
 */
const findById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Create new user
 * @param {Object} data
 */
const create = async (data) => {
  return prisma.user.create({
    data,
  });
};

/**
 * Update user
 * @param {string} id
 * @param {Object} data
 */
const update = async (id, data) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Delete user
 * @param {string} id
 */
const remove = async (id) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findByEmail,
  findById,
  create,
  update,
  remove,
};