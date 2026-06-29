const Order = require("../models/order.model");

/**
 * GET ORDERS (ROLE + OWNERSHIP SAFE)
 */
const getOrdersService = async (user, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  // 🔥 پایه فیلتر
  let filter = {};

  // 👤 اگر user عادی باشد → فقط سفارش‌های خودش
  if (user.role === "user") {
    filter.user = user.id;
  }

  // 🔎 سرچ
  if (query.search) {
    filter.$or = [
      { patientName: { $regex: query.search, $options: "i" } },
      { doctorName: { $regex: query.search, $options: "i" } },
    ];
  }

  // 📌 فیلتر status
  if (query.status) {
    filter.status = query.status;
  }

  // 📦 گرفتن دیتا
  const orders = await Order.find(filter)
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
 * GET ORDER BY ID (SECURE)
 */
const getOrderByIdService = async (user, id) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  // 🔐 اگر user است → فقط مال خودش
  if (user.role === "user" && order.user.toString() !== user.id) {
    throw new Error("Access denied");
  }

  return order;
};

/**
 * CREATE ORDER
 */
const createOrderService = async (user, data) => {
  const order = await Order.create({
    ...data,
    user: user.id, // 🔥 مهم: اتصال به user
  });

  return order;
};

/**
 * UPDATE STATUS (ADMIN / DENTIST)
 */
const updateOrderStatusService = async (id, status) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  return order;
};

/**
 * DELETE ORDER
 */
const deleteOrderService = async (id) => {
  await Order.findByIdAndDelete(id);
};

module.exports = {
  getOrdersService,
  getOrderByIdService,
  createOrderService,
  updateOrderStatusService,
  deleteOrderService,
};