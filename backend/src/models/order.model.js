/**
 * ORDER REPOSITORY (TEMP IN-MEMORY LAYER)
 * ----------------------------------------
 * PURPOSE:
 * Temporary replacement for PostgreSQL/Prisma orders table
 */

const orders = [];

/**
 * Create new order
 */
const create = async (data) => {
  const order = {
    id: String(Date.now()),

    // order data
    patientName: data.patientName,
    doctorName: data.doctorName,
    caseType: data.caseType,
    shade: data.shade || null,
    quantity: data.quantity || 1,

    status: data.status || "pending",
    dueDate: data.dueDate || null,
    notes: data.notes || "",

    // ownership
    userId: data.userId,

    // timestamps
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  orders.push(order);
  return order;
};

/**
 * Get all orders
 */
const find = async () => {
  return orders;
};

/**
 * Find orders by user
 */
const findByUserId = async (userId) => {
  return orders.filter((order) => order.userId === userId);
};

/**
 * Find order by ID
 */
const findById = async (id) => {
  return orders.find((order) => order.id === id) || null;
};

module.exports = {
  create,
  find,
  findByUserId,
  findById,
};