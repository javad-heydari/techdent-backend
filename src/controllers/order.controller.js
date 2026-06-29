/**
 * ORDER CONTROLLER (CLEAN LAYER)
 * فقط مسئول ارتباط بین request و service است
 */

const orderService = require("../services/order.service");

/**
 * GET ORDERS
 */
const getOrders = async (req, res) => {
  try {
    const result = await orderService.getOrdersService(
      req.user,
      req.query
    );

    return res.status(200).json({
      success: true,
      data: result.orders,
      pagination: {
        total: result.total,
        page: result.page,
        pages: result.pages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ORDER BY ID
 */
const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderByIdService(
      req.user,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * CREATE ORDER
 */
const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrderService(
      req.user,
      req.body
    );

    return res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE ORDER STATUS
 */
const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatusService(
      req.params.id,
      req.body.status
    );

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE ORDER
 */
const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrderService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * EXPORT ALL
 */
module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};