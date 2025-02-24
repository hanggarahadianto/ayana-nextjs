# Use official Ubuntu image
FROM ubuntu:24.04

# Install Node.js, Yarn, and required dependencies
RUN apt update && apt install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt install -y nodejs yarn && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile --production

# Copy the rest of the app files
COPY . .

# Build Next.js
RUN yarn build

# Expose port and start app
EXPOSE 3000
CMD ["yarn", "start"]
