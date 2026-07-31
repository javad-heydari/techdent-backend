/**
 * ORDER ROUTES
 *
 * Handles all order related endpoints.
 */

const express = require("express");
const router = express.Router();


// Middlewares
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");


// Validators
const {
  createOrderSchema,
  updateStatusSchema,
} = require("../validators/order.validator");


// Controllers
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller");


// Services
const {
  getUserOrdersService,
} = require("../services/order.service");



/**
 * GET ALL ORDERS
 */
router.get(
  "/",
  authMiddleware,
  getOrders
);



/**
 * GET CURRENT USER ORDERS
 */
router.get(
  "/me",
  authMiddleware,
  async (req, res, next) => {

    try {

      const userId = req.user.id;

      const orders =
        await getUserOrdersService(userId);


      return res.status(200).json({
        success: true,
        data: orders,
      });


    } catch (error) {

      next(error);

    }

  }
);



/**
 * GET SINGLE ORDER
 */
router.get(
  "/:id",
  authMiddleware,
  getOrderById
);



/**
 * CREATE ORDER
 */
router.post(
  "/",
  authMiddleware,

  validate({
    body: createOrderSchema,
  }),

  createOrder
);



/**
 * UPDATE ORDER STATUS
 */
router.patch(
  "/:id/status",

  authMiddleware,

  roleMiddleware("admin"),

  validate({
    body: updateStatusSchema,
  }),

  updateOrderStatus
);



/**
 * UPDATE ORDER
 */
router.patch(
  "/:id",

  authMiddleware,

  updateOrder
);



/**
 * DELETE ORDER
 */
router.delete(
  "/:id",

  authMiddleware,

  roleMiddleware("admin"),

  deleteOrder
);



module.exports = router;