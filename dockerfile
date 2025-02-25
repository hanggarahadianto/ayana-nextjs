# Use Node.js official image (includes Yarn)
FROM node:22 AS builder

WORKDIR /app

# Only copy necessary files for dependency installation
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production=true

# Copy the rest of the app files (excluding unnecessary files)
COPY . .

# Build Next.js with limited resources
RUN NODE_OPTIONS="--max-old-space-size=1024" yarn build

# Production-ready image
FROM node:22 AS runner

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app ./

# Set environment variable
ENV NODE_ENV=production

# Expose port and start app with limited memory
EXPOSE 3000
CMD ["node", "--max-old-space-size=512", "node_modules/.bin/next", "start"]
