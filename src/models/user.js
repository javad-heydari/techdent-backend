/**
 * USER MODEL (TEMP LAYER - MIGRATION STEP 1)
 * ----------------------------------------
 * WARNING:
 * This is temporary replacement for Mongoose.
 * Will be replaced with Prisma/Postgres table later.
 */

const users = [];

/**
 * Find user by email
 */
const findOne = async ({ email }) => {
  return users.find((u) => u.email === email);
};

/**
 * Find user by ID
 */
const findById = async (id) => {
  return users.find((u) => u.id === id);
};

/**
 * Create user
 */
const create = async (data) => {
  const user = {
    id: String(Date.now()),
    ...data,
    refreshToken: null,
  };

  users.push(user);
  return user;
};

module.exports = {
  findOne,
  findById,
  create,
};