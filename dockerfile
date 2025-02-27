# Gunakan image Node.js berbasis Alpine untuk efisiensi
FROM node:18-alpine

# Set environment variables untuk mengoptimalkan produksi
ENV NODE_ENV=production

# Set direktori kerja di dalam container
RUN mkdir -p /app
WORKDIR /app

# Aktifkan Corepack sebelum menginstal dependencies
RUN corepack enable && corepack prepare yarn@4.6.0 --activate


# Salin file package.json dan yarn.lock sebelum install dependencies
COPY package.json yarn.lock ./


# Install dependencies dengan yarn tanpa menyimpan cache
RUN yarn install --refresh-lockfile --network-timeout 600000

# Salin semua kode aplikasi ke dalam container
COPY . .

# Build aplikasi Next.js
RUN yarn build

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["yarn", "start"]
d