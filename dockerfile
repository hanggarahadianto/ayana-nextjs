# Gunakan base image yang kecil dan cepat
FROM node:20.11.1-alpine3.18 AS builder

# Set working directory
WORKDIR /app

# Copy package manager files lebih dulu agar layer cache lebih optimal
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --immutable --network-timeout 600000

# Copy seluruh project setelah dependencies diinstall
COPY . .

# Build aplikasi
RUN yarn build

# ====== Production Stage ======
FROM node:20.11.1-alpine3.18 AS production

# Set working directory
WORKDIR /app

# Tambahkan user untuk keamanan
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy hasil build dari stage sebelumnya
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set user non-root untuk keamanan
USER nextjs

# Expose port 3000
EXPOSE 3000

# Gunakan entrypoint agar bisa fleksibel di runtime
ENTRYPOINT ["node", "server.js"]
