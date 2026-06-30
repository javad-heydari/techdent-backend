const orderService = require("../services/order.service");

/**
 * GET ORDERS
 */
exports.getOrders = async (req, res) => {
  try {
    const result = await orderService.getOrdersService(req.user, req.query);

    res.status(200).json({
      success: true,
      data: result.orders,
      pagination: {
        total: result.total,
        page: result.page,
        pages: result.pages,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * GET ORDER
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderByIdService(
      req.user,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * CREATE ORDER
 */
exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrderService(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * UPDATE ORDER STATUS
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatusService(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * UPDATE ORDER
 */
exports.updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrderService(
      req.user,
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * DELETE ORDER
 */
exports.deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrderService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order deleted",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};