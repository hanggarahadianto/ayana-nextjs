# ========================================
# Stage 1: Builder (Untuk Install & Build)
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

# Debugging: Pastikan yarn ada sebelum install
RUN ls -la .yarn/releases/

# Install dependencies tanpa cache
RUN yarn install --immutable --inline-builds --check-files

# Debugging: Cek apakah .pnp.cjs dan .pnp.loader.mjs ada
RUN ls -la /app

# Salin semua kode proyek
COPY . .

# Build Next.js
RUN yarn build

# ========================================
# Stage 2: Runner (Untuk Runtime Container)
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
COPY --from=builder /app/.pnp.cjs ./
COPY --from=builder /app/.pnp.loader.mjs ./

# Debugging: Cek apakah .pnp.cjs ada
RUN ls -la /app

# Jika .pnp.cjs tidak ada, jalankan yarn install ulang
RUN if [ ! -f "/app/.pnp.cjs" ]; then yarn install --immutable --inline-builds --check-files; fi

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["yarn", "start"]
