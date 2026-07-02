# =========================
# TechDent Backend (Optimized Docker Image)
# =========================

FROM node:22-alpine

# Set working directory
WORKDIR /app

# =========================
# 1. Copy only package files first (for caching)
# =========================
COPY package*.json ./

# =========================
# 2. Install dependencies (cached layer)
# =========================
RUN npm ci || npm install

# =========================
# 3. Copy source code
# =========================
COPY . .

# =========================
# 4. Expose API port
# =========================
EXPOSE 5000

# =========================
# 5. Start server
# =========================
CMD ["npm", "run", "dev"]