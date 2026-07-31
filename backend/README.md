# 🦷 TechDent Backend

> Enterprise-grade Backend for the TechDent Platform

TechDent is a modern platform designed to connect **Dentists**, **Dental Laboratories**, and **Dental Equipment Suppliers** into one unified ecosystem.

The backend is built with a scalable architecture using **Node.js**, **Express.js**, **Prisma**, **PostgreSQL**, and **Docker**, following clean architecture principles and production-ready best practices.

---

# 🚀 Project Goals

TechDent aims to digitize the dental industry by providing:

- Dental Case Management
- Laboratory Workflow
- Dentist Dashboard
- Marketplace
- Equipment Suppliers
- Order Tracking
- Authentication & Authorization
- Notifications
- File Upload
- API-first Architecture

---

# 🏗 Architecture

This project follows a layered architecture.

```
Client
   │
   ▼
Routes
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

Business logic is isolated inside the Service layer.

Controllers never communicate directly with the database.

Repositories are the only layer allowed to access Prisma.

---

# 📂 Project Structure

```
backend/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── docker/
│   └── docker-compose.yml
│
├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── server.js
│
├── Dockerfile
├── package.json
└── README.md
```

---

# ⚙ Tech Stack

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL 17
- Prisma ORM

## Authentication

- JWT Access Token
- JWT Refresh Token
- Session Management

## Security

- Helmet
- CORS
- Rate Limiting
- RBAC

## Containerization

- Docker
- Docker Compose

---

# ✨ Current Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Token Rotation
- Logout
- Session Storage
- Token Revocation

---

## Authorization

Role Based Access Control (RBAC)

Supported Roles:

- USER
- ADMIN
- DENTIST *(coming soon)*
- LAB *(coming soon)*
- SUPPLIER *(coming soon)*

---

# 🔐 Authentication Flow

```
Register
      │
      ▼
Access Token
Refresh Token
      │
      ▼
Store Refresh Token
inside PostgreSQL
      │
      ▼
Access Protected APIs
      │
      ▼
Refresh Token
      │
      ▼
Generate New Access Token
      │
      ▼
Logout
      │
      ▼
Invalidate Session
```

---

# 📦 Installation

Clone project

```bash
git clone https://github.com/javad-heydari/techdent-backend.git
```

Go to project

```bash
cd techdent-backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example:

```env
PORT=5000

DATABASE_URL=postgresql://techdent:techdent_password@localhost:5432/techdent_dev

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRES=30m

REFRESH_TOKEN_EXPIRES=7d
```

---

# 🐳 Docker

Build project

```bash
docker compose build
```

Start services

```bash
docker compose up -d
```

Stop services

```bash
docker compose down
```

---

# Database

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/refresh |
| POST | /api/auth/logout |
| GET | /api/auth/me |
| GET | /api/auth/admin |

---

# Development Principles

This project follows:

- Clean Code
- SOLID Principles
- Repository Pattern
- Service Layer Pattern
- Enterprise Folder Structure
- REST API Standards

---

# Roadmap

## Phase 1

- Authentication ✅
- RBAC ✅
- Session Management ✅

---

## Phase 2

- Validation Layer
- Error Handling
- Logging
- Swagger

---

## Phase 3

- Dentist Module

---

## Phase 4

- Laboratory Module

---

## Phase 5

- Orders

---

## Phase 6

- Marketplace

---

## Phase 7

- File Upload

---

## Phase 8

- Notifications

---

## Phase 9

- Payment Gateway

---

## Phase 10

- Production Deployment

---

# Testing

Tools

- Postman
- Prisma Studio
- pgAdmin

---

# License

This project is licensed under the MIT License.

---

# Author

**Javad Heydari**

GitHub:

https://github.com/javad-heydari

---

# Status

🚧 Under Active Development

Current Version:

**v0.1.0**

---

Made with ❤️ for the Dental Industry.