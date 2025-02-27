# ========================================
# Stage 1: Builder (Install & Build)
# ========================================
FROM node:20-alpine AS builder

# Set environment production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Aktifkan Corepack dan pastikan Yarn tersedia
RUN corepack enable && corepack prepare yarn@stable --activate

# Salin file yang diperlukan sebelum install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# Debugging: Pastikan Yarn ada sebelum install
RUN ls -la .yarn/releases/

# Install dependencies tanpa cache
RUN yarn install --immutable --inline-builds  # ✅ Perbaikan di sini

# Debugging: Cek apakah `.pnp.cjs` dan `.pnp.loader.mjs` ada di root (`/`)
RUN ls -la /

# Salin semua kode proyek setelah install dependencies
COPY . .

# Build Next.js
RUN yarn build

# ========================================
# Stage 2: Runner (Runtime)
# ========================================
FROM node:20-alpine AS runner

# Set environment production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Aktifkan Corepack & Yarn PnP di runtime
RUN corepack enable && corepack prepare yarn@stable --activate

# Salin file hasil build & yang diperlukan untuk runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml

# Pastikan `.pnp.cjs` dan `.pnp.loader.mjs` tetap berada di root (`/`)


COPY --from=builder /app/.pnp.cjs ./
COPY --from=builder /app/.pnp.loader.mjs ./


# Debugging: Periksa apakah file Yarn dan PnP sudah benar
RUN ls -la /

# Jika `.pnp.cjs` tidak ada di root (`/`), jalankan `yarn install` ulang
RUN if [ ! -f "/.pnp.cjs" ]; then yarn install --immutable --inline-builds; fi  # ✅ Perbaikan di sini

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["yarn", "start"]
