# Use Node.js official image (includes Yarn)
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files first (to cache dependencies)
COPY package.json yarn.lock ./

# Install dependencies (including devDependencies for Next.js build)
RUN yarn install

# Copy the rest of the app files
COPY . .

# Build Next.js
RUN yarn build

# Production-ready image
FROM node:22 AS runner

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app ./

# Expose port and start app
EXPOSE 3000
CMD ["yarn", "start"]