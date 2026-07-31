const orderService = require("../services/order.service");
const { success, failure } = require("../utils/response");

/**
 * GET ORDERS
 */
exports.getOrders = async (req, res) => {
  try {
    const result = await orderService.getOrdersService(req.user, req.query);

    return success(
      res,
      {
        orders: result.orders,
        pagination: {
          total: result.total,
          page: result.page,
          pages: result.pages,
        },
      },
      "Orders retrieved successfully"
    );
  } catch (err) {
    return failure(res, err.message, 500);
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

    return success(res, order, "Order retrieved successfully");
  } catch (err) {
    const statusCode = err.message === "Order not found" ? 404 : 403;
    return failure(res, err.message, statusCode);
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

    return success(res, order, "Order created successfully", 201);
  } catch (err) {
    return failure(res, err.message, 400);
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

    return success(res, order, "Order status updated successfully");
  } catch (err) {
    return failure(res, err.message, 400);
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

    return success(res, order, "Order updated successfully");
  } catch (err) {
    const statusCode = err.message === "Access denied" ? 403 : 400;
    return failure(res, err.message, statusCode);
  }
};

/**
 * DELETE ORDER
 */
exports.deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrderService(req.params.id);

    return success(res, null, "Order deleted successfully");
  } catch (err) {
    return failure(res, err.message, 400);
  }
};