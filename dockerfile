# Gunakan image Node.js berbasis Alpine untuk efisiensi
FROM node:20-alpine AS builder

# Set environment variables untuk mengoptimalkan produksi
ENV NODE_ENV=production

# Set direktori kerja di dalam container
WORKDIR /app

# Aktifkan Corepack sebelum menginstal dependencies
RUN corepack enable && corepack prepare yarn@stable --activate

# Salin file yang dibutuhkan sebelum install dependencies
COPY package.json yarn.lock .yarnrc.yml .yarn/ ./

# Debugging: Periksa isi .yarn/releases/ untuk memastikan file tersedia
RUN ls -la .yarn/releases/

# Install dependencies dengan Yarn tanpa menyimpan cache
RUN yarn install --immutable --inline-builds

# Salin seluruh kode proyek setelah install dependencies
COPY . .

# Build aplikasi Next.js
RUN yarn build

# ========================================
# Stage: Runner (untuk runtime container)
# ========================================
FROM node:20-alpine AS runner

# Set direktori kerja dalam container
WORKDIR /app

# Set environment untuk produksi
ENV NODE_ENV=production

# Aktifkan Corepack & Yarn PnP di runtime
RUN corepack enable && corepack prepare yarn@stable --activate

# Salin hanya file yang diperlukan untuk runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.pnp.cjs ./
COPY --from=builder /app/.pnp.loader.mjs ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["yarn", "start"]
