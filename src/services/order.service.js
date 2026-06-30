const Order = require("../models/order.model");

/**
 * GET ORDERS
 * - admin: all
 * - user: own only
 */
exports.getOrdersService = async (user, query) => {
  const filter = {};

  // 👤 USER restriction
  if (user.role !== "admin") {
    filter.user = user.id;
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  if (query.status) filter.status = query.status;
  if (query.caseType) filter.caseType = query.caseType;

  const orders = await Order.find(filter)
    .populate("user", "name email role")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Order.countDocuments(filter);

  return {
    orders,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

/**
 * GET ORDER BY ID
 */
exports.getOrderByIdService = async (user, orderId) => {
  const order = await Order.findById(orderId).populate(
    "user",
    "name email role"
  );

  if (!order) throw new Error("Order not found");

  if (user.role !== "admin" && order.user._id.toString() !== user.id) {
    throw new Error("Access denied");
  }

  return order;
};

/**
 * CREATE ORDER (FIXED)
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

    // 🔥 IMPORTANT
    user: userId,
  });
};

/**
 * UPDATE ORDER STATUS (ADMIN ONLY)
 */
exports.updateOrderStatusService = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  order.status = status;
  await order.save();

  return order;
};

/**
 * UPDATE ORDER (USER + ADMIN)
 */
exports.updateOrderService = async (user, orderId, data) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  // ownership check
  if (user.role !== "admin" && order.user.toString() !== user.id) {
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

  // admin-only
  if (user.role === "admin" && data.status) {
    order.status = data.status;
  }

  await order.save();

  return order;
};

/**
 * GET USER ORDERS
 */
exports.getUserOrdersService = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

/**
 * DELETE ORDER
 */
exports.deleteOrderService = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  await order.deleteOne();

  return true;
};