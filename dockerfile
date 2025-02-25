# 🏗️ STAGE 1: Build Next.js
FROM node:22 AS builder

WORKDIR /app

# 1️⃣ Copy hanya file penting untuk caching dependensi
COPY package.json yarn.lock ./

# 2️⃣ Install semua dependencies (termasuk devDependencies)
RUN yarn install --frozen-lockfile

# 3️⃣ Copy seluruh kode proyek
COPY . .

# 4️⃣ Build Next.js (output akan ada di `.next`)
RUN yarn build

---

# 🏃‍♂️ STAGE 2: Production Runtime
FROM node:22 AS runner

WORKDIR /app

# 5️⃣ Install hanya production dependencies (biar lebih kecil)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

# 6️⃣ Copy hasil build & file penting saja
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules/.prisma node_modules/.prisma  # Jika pakai Prisma

# 7️⃣ Set Environment
ENV NODE_ENV=production
EXPOSE 3000

# 8️⃣ Jalankan Next.js dengan `next start` (lebih cepat dan ringan)
CMD ["yarn", "start"]
