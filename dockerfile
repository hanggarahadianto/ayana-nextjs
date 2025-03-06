


### Frontend Dockerfile (SUDAH EFISIEN) ###

# Base image menggunakan Node.js slim agar lebih kecil
FROM node:20-slim AS base

WORKDIR /app

# Copy file package.json & package-lock.json lebih dulu agar layer caching optimal
COPY package.json package-lock.json ./

# Install dependencies dengan caching (lebih hemat resource)
RUN npm ci --ignore-scripts --prefer-offline

# Copy seluruh kode aplikasi setelah dependensi terinstall
COPY . .

# Build aplikasi Next.js menggunakan output standalone (lebih ringan)
RUN npm run build

# Production image menggunakan Node.js slim
FROM node:20-slim AS production
WORKDIR /app

# Hanya copy file yang dibutuhkan agar ukuran lebih kecil
COPY --from=base /app/.next .next
COPY --from=base /app/package.json .
COPY --from=base /app/node_modules node_modules

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "run", "start"]