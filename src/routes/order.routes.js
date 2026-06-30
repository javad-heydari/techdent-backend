/**
 * ORDER ROUTES (SECURE + CLEAN + READY FOR PRODUCTION)
 */

const express = require("express");
const router = express.Router();

// middlewares
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

// validators
const {
  createOrderSchema,
  updateStatusSchema,
} = require("../validators/order.validator");

// controllers
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller");

// services (NEW)
const {
  getUserOrdersService,
} = require("../services/order.service");

/**
 * GET ALL ORDERS
 * - Admin: all orders
 * - User: filtered in service layer
 */
router.get("/", authMiddleware, getOrders);

/**
 * GET USER OWN ORDERS (NEW - CLEAN ENDPOINT)
 * - User sees only their own orders
 * - No role confusion
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // get user id from JWT middleware
    const userId = req.user.id;

    // fetch only user orders
    const orders = await getUserOrdersService(userId);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * GET SINGLE ORDER
 */
router.get("/:id", authMiddleware, getOrderById);

/**
 * CREATE ORDER
 */
router.post(
  "/",
  authMiddleware,
  validate(createOrderSchema),
  createOrder
);

/**
 * UPDATE STATUS (ADMIN ONLY)
 */
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  validate(updateStatusSchema),
  updateOrderStatus
);
router.patch("/:id", authMiddleware, updateOrder);
/**
 * DELETE ORDER (ADMIN ONLY)
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteOrder
);

router.patch("/:id/status", authMiddleware, (req, res, next) => {
  console.log("🔥 BODY RECEIVED:", req.body);
  next();
}, validate(updateStatusSchema), updateOrderStatus);

module.exports = router;