/**
 * ==========================================================
 * Swagger Loader
 * ----------------------------------------------------------
 * Loads OpenAPI YAML specification and serves Swagger UI.
 * ==========================================================
 */

const path = require("path");
const YAML = require("yamljs");

/**
 * Absolute path to OpenAPI specification.
 */
const openApiPath = path.join(
  __dirname,
  "../../docs/openapi.yaml"
);

/**
 * Load YAML file.
 */
const swaggerDocument = YAML.load(openApiPath);

module.exports = swaggerDocument;