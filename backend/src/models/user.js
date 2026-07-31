/**
 * USER REPOSITORY (TEMP IN-MEMORY LAYER)
 * ----------------------------------------
 * PURPOSE:
 * This is a temporary repository layer before Prisma migration.
 *
 * IMPORTANT:
 * - Replaces MongoDB/Mongoose during transition
 * - Same interface will be used with Prisma later
 */

const users = [];

/**
 * Find user by email
 * @param {Object} param0
 */
const findOne = async ({ email }) => {
  return users.find((user) => user.email === email) || null;
};

/**
 * Find user by ID
 * @param {string} id
 */
const findById = async (id) => {
  return users.find((user) => user.id === id) || null;
};

/**
 * Create new user
 * @param {Object} data
 */
const create = async (data) => {
  const user = {
    id: String(Date.now()),

    // core fields
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || "user",

    // auth field
    refreshToken: null,

    // timestamps (simulate DB behavior)
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(user);
  return user;
};

/**
 * Update user by ID
 * (important for refreshToken updates later)
 */
const updateById = async (id, updateData) => {
  const user = users.find((u) => u.id === id);

  if (!user) return null;

  Object.assign(user, updateData, {
    updatedAt: new Date(),
  });

  return user;
};

module.exports = {
  findOne,
  findById,
  create,
  updateById,
};