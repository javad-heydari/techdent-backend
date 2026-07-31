/**
 * AUTH VALIDATORS
 *
 * Contains validation schemas
 * related to authentication flows.
 */

const { z } = require("zod");


/**
 * REGISTER VALIDATION
 *
 * Validates new user creation data.
 */
const registerSchema = z.object({

  // User full name
  name: z
    .string()
    .min(2, "name must be at least 2 characters")
    .max(100, "name is too long"),


  // User email
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase(),


  // User password
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .max(100, "password is too long"),


  // User role
  // Optional because normal users should not choose roles
  role: z
    .enum([
      "USER",
      "ADMIN",
    ])
    .optional(),

});



/**
 * LOGIN VALIDATION
 *
 * Validates user login credentials.
 */
const loginSchema = z.object({

  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase(),


  password: z
    .string()
    .min(1, "password is required"),

});



module.exports = {
  registerSchema,
  loginSchema,
};