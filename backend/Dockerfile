# ==========================================
# TechDent Backend Dockerfile
# ------------------------------------------
# Production-ready Docker image for Node.js
# + Prisma + PostgreSQL
# ==========================================

FROM node:22-slim

# ------------------------------------------
# Working directory
# ------------------------------------------
WORKDIR /app

# ------------------------------------------
# Install required OS packages
# ------------------------------------------
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------
# Copy package files first (better caching)
# ------------------------------------------
COPY package*.json ./

# ------------------------------------------
# Install dependencies
# ------------------------------------------
RUN npm install

# ------------------------------------------
# Copy project files
# ------------------------------------------
COPY . .

# ------------------------------------------
# Generate Prisma Client INSIDE Linux
# (Very important for Docker runtime)
# ------------------------------------------
RUN npx prisma generate

# ------------------------------------------
# Expose application port
# ------------------------------------------
EXPOSE 5000

# ------------------------------------------
# Start application
# ------------------------------------------
CMD ["npm", "run", "dev"]