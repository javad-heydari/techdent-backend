# TechDent Backend

## Project Overview

TechDent Backend is a production-oriented REST API built with Express.js and Prisma.

The project follows a layered architecture to keep responsibilities separated, improve maintainability, and simplify testing and future scaling.

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation
- Docker
- Docker Compose

---

# Project Architecture

```
Client
    │
    ▼
Routes
    │
    ▼
Middlewares
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL
```

---

# Folder Structure

```
src
│
├── config
│
├── controllers
│
├── lib
│
├── middlewares
│
├── models
│
├── repositories
│
├── routes
│
├── services
│
├── utils
│
├── validators
│
├── app.js
│
└── server.js
```

---

# Layer Responsibilities

## Routes

Responsible for:

- Registering API endpoints
- Connecting routes to controllers
- Applying middlewares

Routes must never contain business logic.

---

## Controllers

Responsible for:

- Receiving HTTP requests
- Calling services
- Returning HTTP responses

Controllers should remain thin.

---

## Services

Responsible for:

- Business logic
- Validation of business rules
- Calling repositories
- Throwing application errors

Services should not access Prisma directly.

---

## Repositories

Responsible for:

- Database access
- Prisma queries
- CRUD operations

Repositories must not contain business logic.

---

## Middlewares

Responsible for:

- Authentication
- Authorization
- Validation
- Error handling
- Request preprocessing

---

## Validators

Responsible for:

- Request validation
- Zod schemas
- Input sanitization

---

## Utils

Reusable helper functions.

Examples:

- JWT helpers
- Async wrapper
- Custom errors
- Workflow helpers

---

# Coding Standards

- Use CommonJS
- Use async/await
- Keep functions small
- Use meaningful names
- Prefer composition over duplication
- Write clean code
- Every file should include English comments where necessary

---

# Naming Convention

Controllers

```
auth.controller.js
```

Services

```
auth.service.js
```

Repositories

```
user.repository.js
```

Validators

```
user.validator.js
```

Middlewares

```
auth.middleware.js
```

---

# API Standards

Successful response

```json
{
  "success": true,
  "data": {}
}
```

Error response

```json
{
  "success": false,
  "message": "...",
  "errors": []
}
```

---

# Git Workflow

Feature

```
feature/*
```

Bug Fix

```
fix/*
```

Refactor

```
refactor/*
```

Documentation

```
docs/*
```

---

# Commit Convention

Examples

```
feat(auth): add JWT authentication

fix(order): validate order status

refactor(user): simplify repository

docs: update README

test(auth): add login tests
```

---

# Development Rules

- Never access Prisma from controllers
- Never place business logic inside routes
- Never duplicate validation logic
- Always use repositories for database operations
- Always use asyncHandler for async controllers
- Always throw AppError for expected errors
- Validate every request before reaching controllers

---

# Future Modules

- Authentication
- Users
- RBAC
- Dentist
- Laboratory
- Supplier
- Orders
- Notifications
- File Upload
- Payments
- Dashboard
- Reports
- Audit Logs

---

# Bootcamp Progress

- ✅ Bootcamp 01 - Project Setup
- ✅ Bootcamp 02 - Prisma & Database
- ✅ Bootcamp 03 - JWT Authentication
- 🔄 Bootcamp 04 - Validation, Error Handling & Swagger
- ⏳ Bootcamp 05 - Users & RBAC
- ⏳ Bootcamp 06 - Orders
- ⏳ Bootcamp 07 - File Upload
- ⏳ Bootcamp 08 - Notifications
- ⏳ Bootcamp 09 - Testing
- ⏳ Bootcamp 10 - CI/CD & Deployment