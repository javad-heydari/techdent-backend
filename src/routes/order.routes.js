/**
 * ORDER ROUTES (RBAC + VALIDATION + SECURITY LAYER)
 */

const express = require("express");
const router = express.Router();

/**
 * Middlewares
 */
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

/**
 * Validators
 */
const {
  createOrderSchema,
  updateStatusSchema,
} = require("../validators/order.validator");

/**
 * Controllers
 */
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller");

/**
 * GET ALL ORDERS
 * admin + dentist can see all orders
 * user فقط سفارش‌های خودش را می‌بیند (داخل service کنترل شده)
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "dentist"),
  getOrders
);

/**
 * GET SINGLE ORDER
 * admin + dentist + owner (inside service check)
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "dentist", "user"),
  getOrderById
);

/**
 * CREATE ORDER
 * user + dentist + admin
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "dentist", "user"),
  validate(createOrderSchema),
  createOrder
);

/**
 * UPDATE ORDER STATUS
 * only admin + dentist
 */
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin", "dentist"),
  validate(updateStatusSchema),
  updateOrderStatus
);

/**
 * DELETE ORDER
 * only admin
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteOrder
);

module.exports = router;