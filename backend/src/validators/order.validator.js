/**
 * ORDER VALIDATORS
 *
 * Contains all validation schemas
 * related to order operations.
 */

const { z } = require("zod");


/**
 * CREATE ORDER VALIDATION
 */
const createOrderSchema = z.object({

  // Patient full name
  patientName: z
    .string()
    .min(2, "patientName must be at least 2 characters"),


  // Dentist name
  doctorName: z
    .string()
    .min(2, "doctorName must be at least 2 characters"),


  // Dental case type
  caseType: z
    .string()
    .min(2, "caseType must be at least 2 characters"),


  // Dental shade (optional)
  shade: z
    .string()
    .max(50)
    .optional(),


  // Quantity accepts string or number
  quantity: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),


  // Delivery date
  dueDate: z
    .coerce
    .date()
    .optional(),


  // Additional notes
  notes: z
    .string()
    .max(1000, "notes is too long")
    .optional(),

});


/**
 * UPDATE ORDER STATUS VALIDATION
 */
const updateStatusSchema = z.object({

  status: z.enum([
    "pending",
    "in_progress",
    "completed",
    "delivered",
  ]),

});


module.exports = {
  createOrderSchema,
  updateStatusSchema,
};