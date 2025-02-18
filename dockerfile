


# Use official Node.js image
FROM node:18-alpine

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