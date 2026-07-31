/**
 * ==========================================================
 * Standard API Response Helpers
 * ----------------------------------------------------------
 * Every API response should use these helpers.
 * This guarantees a consistent response structure.
 * ==========================================================
 */

/**
 * Success Response
 */
const success = (
  res,
  data = null,
  message = "Success",
  statusCode = 200,
  meta = null
) => {

  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });

};


/**
 * Created Response
 */
const created = (
  res,
  data,
  message = "Created successfully"
) => {

  return success(
    res,
    data,
    message,
    201
  );

};


/**
 * Failure Response
 */
const failure = (
  res,
  message = "Internal Server Error",
  statusCode = 500,
  errors = null
) => {

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });

};


module.exports = {
  success,
  created,
  failure,
};