/**
 * VALIDATION MIDDLEWARE
 *
 * Responsible for validating request data
 * using Zod schemas before reaching controllers.
 *
 * Supports:
 * - body validation
 * - params validation
 * - query validation
 */

const AppError = require("../utils/AppError");

module.exports = (schemas) => {
  return (req, res, next) => {
    try {

      // Validate request body
      if (schemas.body) {

        const result =
          schemas.body.safeParse(req.body);


        if (!result.success) {

          throw new AppError(
            "Validation failed",
            400,
            result.error.issues
          );

        }


        // Store validated and transformed data
        req.body = result.data;

      }



      // Validate request params
      if (schemas.params) {

        const result =
          schemas.params.safeParse(req.params);


        if (!result.success) {

          throw new AppError(
            "Validation failed",
            400,
            result.error.issues
          );

        }


        req.params = result.data;

      }



      // Validate request query
      if (schemas.query) {

        const result =
          schemas.query.safeParse(req.query);


        if (!result.success) {

          throw new AppError(
            "Validation failed",
            400,
            result.error.issues
          );

        }


        req.query = result.data;

      }


      next();


    } catch (error) {

      // Send error to global error handler
      next(error);

    }
  };
};