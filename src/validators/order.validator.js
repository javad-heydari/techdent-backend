/**
 * ORDER VALIDATION (ZOD)
 * جلوگیری از ورود دیتا خراب
 */

const { z } = require("zod");

/**
 * CREATE ORDER VALIDATION
 */
const createOrderSchema = z.object({
  patientName: z.string().min(2, "patientName is required"),
  doctorName: z.string().min(2, "doctorName is required"),
  caseType: z.string().min(2, "caseType is required"),

  shade: z.string().optional(),

  quantity: z
    .number()
    .int()
    .positive()
    .optional(),

  dueDate: z.string().optional(),

  notes: z.string().optional(),
});

/**
 * UPDATE STATUS VALIDATION
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