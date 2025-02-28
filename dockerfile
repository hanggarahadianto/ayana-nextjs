# ========================================
# Stage 1: Builder (Install & Build)
# ========================================
FROM node:20 AS builder

# Set environment ke production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Aktifkan Corepack agar Yarn tersedia
RUN corepack enable && corepack prepare yarn@stable --activate

# Salin file yang diperlukan terlebih dahulu
COPY package.json yarn.lock .yarnrc.yml ./

# Buat folder `.yarn/releases` jika belum ada
RUN mkdir -p .yarn/releases

# Salin Yarn jika ada di proyek
COPY .yarn/releases .yarn/releases/

# Debugging: Pastikan Yarn tersedia sebelum install dependencies
RUN ls -la .yarn/releases/

# Install dependencies menggunakan PnP
RUN yarn install --immutable

# Salin seluruh kode proyek setelah dependencies diinstall
COPY . .

# **Pastikan `.pnp.cjs` dan `.pnp.loader.mjs` ada**
RUN ls -la .pnp.cjs .pnp.loader.mjs

# Build aplikasi Next.js
RUN yarn build

# ========================================
# Stage 2: Runner (Runtime)
# ========================================
FROM node:20 AS runner

# Set environment ke production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Aktifkan Corepack agar Yarn tersedia
RUN corepack enable && corepack prepare yarn@stable --activate

# Salin hasil build & file yang diperlukan ke runtime container
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --from=builder /app/.yarn ./.yarn

# Debugging: Pastikan semua file yang diperlukan ada di runtime
RUN ls -la /app

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi Next.js dengan PnP
CMD ["yarn", "start"]
