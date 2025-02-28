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

# Salin file yang diperlukan terlebih dahulu untuk caching lebih optimal
COPY package.json yarn.lock .yarnrc.yml ./

# Salin Yarn jika ada di proyek
COPY .yarn/releases .yarn/releases/

# Debugging: Pastikan Yarn tersedia sebelum install dependencies
RUN ls -la .yarn/releases/

# Install dependencies menggunakan PnP (Plug'n'Play)
RUN yarn install --immutable --network-timeout 600000

# Salin seluruh kode proyek setelah dependencies diinstall
COPY . .

# Pastikan `.pnp.cjs` dan `.pnp.loader.mjs` tersedia setelah install
RUN ls -la .pnp.cjs .pnp.loader.mjs || (echo "Missing PnP files!" && exit 1)

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

# Salin hanya file yang diperlukan untuk runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --from=builder /app/.yarn ./.yarn

# Debugging: Pastikan semua file yang diperlukan ada di runtime
RUN ls -la /app || (echo "Runtime files missing!" && exit 1)

# Set permission untuk memastikan akses yang benar
RUN chmod -R 755 /app

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi Next.js dengan PnP
CMD ["yarn", "start"]
