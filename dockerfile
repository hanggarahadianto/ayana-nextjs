# # Base Image untuk Build
# FROM node:20-bullseye AS base

# # Set direktori kerja dalam container
# WORKDIR /app

# # Copy package.json dan package-lock.json terlebih dahulu untuk caching dependensi
# COPY package.json package-lock.json ./

# # Pastikan versi library tidak otomatis berubah
# RUN npm ci --ignore-scripts && npm cache clean --force

# # Copy seluruh kode aplikasi
# COPY . .

# # Build aplikasi Next.js
# RUN npm run build

# # Production Image
# FROM node:20-slim AS production
# WORKDIR /app

# # Copy hasil build dari stage base
# COPY --from=base /app .

# # Atur variabel lingkungan
# ENV NODE_ENV=production

# # Expose port default Next.js
# EXPOSE 3000

# # Jalankan aplikasi Next.js
# CMD ["npm", "run", "start"]


### Frontend Dockerfile (SUDAH EFISIEN) ###

# Base image menggunakan Node.js slim agar lebih kecil
FROM node:20-slim AS base

WORKDIR /app

# Copy file package.json & package-lock.json lebih dulu agar layer caching optimal
COPY package.json package-lock.json ./

# Install dependencies dengan caching (lebih hemat resource)
RUN npm ci --ignore-scripts --prefer-offline

# Copy seluruh kode aplikasi setelah dependensi terinstall
COPY . .

# Build aplikasi Next.js menggunakan output standalone (lebih ringan)
RUN npm run build

# Production image menggunakan Node.js slim
FROM node:20-slim AS production
WORKDIR /app

# Hanya copy file yang dibutuhkan agar ukuran lebih kecil
COPY --from=base /app/.next .next
COPY --from=base /app/package.json .
COPY --from=base /app/node_modules node_modules

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "run", "start"]

### Backend Dockerfile (SUDAH EFISIEN) ###

# Gunakan lebih kecil base image (Alpine lebih ringan)
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Install dependencies yang diperlukan
RUN apk add --no-cache git ca-certificates

# Gunakan environment variable agar build lebih cepat & ringan
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GOPROXY=https://proxy.golang.org,direct

# Copy module Go dan download dependensi
COPY go.mod go.sum ./
RUN go mod download

# Copy seluruh kode aplikasi
COPY . .

# Build binary yang lebih kecil & cepat
RUN go build -trimpath -ldflags="-s -w" -o main .

# Gunakan base image lebih kecil (Alpine) untuk runtime
FROM alpine:3.19

WORKDIR /app

# Install hanya sertifikat SSL (agar lebih aman)
RUN apk add --no-cache ca-certificates

# Copy binary dari tahap build
COPY --from=builder /app/main .

# Beri izin eksekusi
RUN chmod +x main

EXPOSE 5000
CMD ["./main"]
