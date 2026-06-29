/**
 * VALIDATION MIDDLEWARE (ZOD)
 * جلوگیری از request های خراب
 */

module.exports = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.errors?.[0]?.message || "Validation error",
      });
    }
  };
};