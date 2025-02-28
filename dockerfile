# Base Image untuk Build
FROM node:20-bullseye AS base

# Set direktori kerja dalam container
WORKDIR /app

# Copy package.json dan package-lock.json terlebih dahulu untuk caching dependensi
COPY package.json package-lock.json ./

# Pastikan versi library tidak otomatis berubah
RUN npm ci --ignore-scripts && npm cache clean --force

# Copy seluruh kode aplikasi
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Production Image
FROM node:20-slim AS production
WORKDIR /app

# Copy hasil build dari stage base
COPY --from=base /app .

# Atur variabel lingkungan
ENV NODE_ENV=production

# Expose port default Next.js
EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["npm", "run", "start"]
