# ========================================
# Stage 1: Builder (Install & Build)
# ========================================
FROM node:20 AS builder

# Set environment ke production
ENV NODE_OPTIONS="--openssl-legacy-provider"


# Set working directory
WORKDIR /app

# Aktifkan Corepack untuk memastikan Yarn tersedia
RUN corepack enable && corepack prepare yarn@stable --activate

# Salin file yang diperlukan untuk dependency management
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn/

# Debugging: Pastikan Yarn tersedia sebelum install dependencies
ls -la .yarn/releases/
RUN ls -la .yarn/releases/

# Install dependencies menggunakan Yarn PnP (tanpa cache)
RUN yarn install --immutable



# Debugging: Pastikan `.pnp.cjs` dan `.pnp.loader.mjs` ada
RUN ls -la /app

# Salin seluruh kode proyek setelah install dependencies
COPY . .

# Build aplikasi Next.js
RUN yarn build

# Debugging: Cek apakah folder `.next` berhasil dibuat
RUN ls -la .next

# ========================================
# Stage 2: Runner (Runtime)
# ========================================
FROM node:20 AS runner

# Set environment ke production
ENV NODE_OPTIONS="--openssl-legacy-provider"


# Set working directory
WORKDIR /app

# Aktifkan Corepack & Yarn PnP di runtime
RUN corepack enable && corepack prepare yarn@stable --activate

# Salin hasil build & file yang diperlukan ke runtime container
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarn ./.yarn/
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/.pnp.loader.mjs ./.pnp.loader.mjs


# Debugging: Pastikan semua file yang diperlukan ada di runtime
RUN ls -la /app

# Jika `.pnp.cjs` tidak ada, jalankan `yarn install` ulang
RUN test -f "/app/.pnp.cjs" || yarn install --immutable --inline-builds

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["yarn", "start"]
