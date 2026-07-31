const Order = require("../models/order.model");
const userRepository = require("../repositories/user.repository");

/**
 * GET ORDERS
 * - admin: all
 * - user: own only
 */
exports.getOrdersService = async (user, query) => {
  let orders;

  if (user.role === "admin") {
    orders = await Order.find();
  } else {
    orders = await Order.findByUserId(user.id);
  }

  if (query.status) {
    orders = orders.filter(
      (o) => o.status === query.status
    );
  }

  if (query.caseType) {
    orders = orders.filter(
      (o) => o.caseType === query.caseType
    );
  }

  orders.sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const paginated = orders.slice(skip, skip + limit);
  const total = orders.length;

  return {
    orders: paginated,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

/**
 * GET ORDER BY ID
 */
exports.getOrderByIdService = async (user, orderId) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  if (user.role !== "admin" && order.userId !== user.id) {
    throw new Error("Access denied");
  }

  const userData = await userRepository.findById(order.userId);

  return {
    ...order,
    user: userData || { id: order.userId },
  };
};

/**
 * CREATE ORDER
 */
exports.createOrderService = async (userId, data) => {
  if (!userId) throw new Error("User not found in request");

  return await Order.create({
    patientName: data.patientName,
    doctorName: data.doctorName,
    caseType: data.caseType,
    shade: data.shade || null,
    quantity: data.quantity || 1,
    notes: data.notes || "",
    dueDate: data.dueDate || null,
    userId,
  });
};

/**
 * UPDATE ORDER STATUS (ADMIN ONLY)
 */
exports.updateOrderStatusService = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  order.status = status;
  order.updatedAt = new Date();

  return order;
};

/**
 * UPDATE ORDER (USER + ADMIN)
 */
exports.updateOrderService = async (user, orderId, data) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  if (user.role !== "admin" && order.userId !== user.id) {
    throw new Error("Access denied");
  }

  const baseFields = [
    "patientName",
    "doctorName",
    "caseType",
    "shade",
    "quantity",
    "notes",
    "dueDate",
  ];

  baseFields.forEach((field) => {
    if (data[field] !== undefined) {
      order[field] = data[field];
    }
  });

  if (user.role === "admin" && data.status) {
    order.status = data.status;
  }

  order.updatedAt = new Date();

  return order;
};

/**
 * GET USER ORDERS
 */
exports.getUserOrdersService = async (userId) => {
  const orders = await Order.findByUserId(userId);

  orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return orders;
};

/**
 * DELETE ORDER
 */
exports.deleteOrderService = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  const orders = await Order.find();
  const index = orders.findIndex((o) => o.id === orderId);

  if (index !== -1) {
    orders.splice(index, 1);
  }

  return true;
};