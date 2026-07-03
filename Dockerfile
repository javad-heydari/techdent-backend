# =========================
# TechDent Backend (Prisma compatible)
# =========================

FROM node:22-slim

WORKDIR /app

# Install dependencies for Prisma + OpenSSL
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]