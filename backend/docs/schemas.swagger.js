/**
 * ==========================================================
 * Shared Swagger Schemas
 * ----------------------------------------------------------
 * Reusable OpenAPI components used across the project.
 * ==========================================================
 */

/**
 * @swagger
 * components:
 *
 *   schemas:
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 664aef09e18d7f6a3f2b0011
 *
 *         name:
 *           type: string
 *           example: Javad Heydari
 *
 *         email:
 *           type: string
 *           example: javad@test.com
 *
 *         role:
 *           type: string
 *           example: USER
 *
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Javad Heydari
 *
 *         email:
 *           type: string
 *           example: javad@test.com
 *
 *         password:
 *           type: string
 *           example: 12345678
 *
 *         role:
 *           type: string
 *           example: USER
 *
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: javad@test.com
 *
 *         password:
 *           type: string
 *           example: 12345678
 *
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 1783544003455
 *
 *         patientName:
 *           type: string
 *           example: Ali Ahmadi
 *
 *         doctorName:
 *           type: string
 *           example: Dr Reza
 *
 *         caseType:
 *           type: string
 *           example: Crown
 *
 *         shade:
 *           type: string
 *           example: A2
 *
 *         quantity:
 *           type: integer
 *           example: 2
 *
 *         status:
 *           type: string
 *           example: pending
 *
 *         dueDate:
 *           type: string
 *           example: 2026-07-20
 *
 *         notes:
 *           type: string
 *           example: Urgent case
 *
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *
 *         message:
 *           type: string
 *           example: Validation failed
 *
 *         errors:
 *           type: array
 *           items:
 **/             type: string