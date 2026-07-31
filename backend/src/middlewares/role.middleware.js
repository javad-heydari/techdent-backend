/**
 * ==========================================================
 * Role Authorization Middleware
 * ----------------------------------------------------------
 * Restricts access based on user roles.
 *
 * Examples:
 *
 * router.get(
 *      "/users",
 *      authenticate,
 *      authorize("ADMIN"),
 *      controller
 * );
 *
 * router.post(
 *      "/orders",
 *      authenticate,
 *      authorize("DOCTOR", "ADMIN"),
 *      controller
 * );
 * ==========================================================
 */

/**
 * Role Authorization Middleware
 *
 * @param  {...string} allowedRoles
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Authentication middleware must run first
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // Check if current user role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

module.exports = authorize;