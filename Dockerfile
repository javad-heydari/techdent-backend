# =========================
# TechDent Backend Docker Image (Stable Version)
# =========================

# Use stable Node.js LTS (NOT alpine for fewer dependency issues)
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# =========================
# Copy dependency definitions first (better caching)
# =========================
COPY package*.json ./

# Install dependencies with clean install (more reliable)
RUN npm ci || npm install

# =========================
# Copy application source
# =========================
COPY . .

# =========================
# Expose API port
# =========================
EXPOSE 5000

# =========================
# Start application (development mode with nodemon)
# =========================
CMD ["npm", "run", "dev"]