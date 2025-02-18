# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the app files
COPY . .

# Build Next.js
RUN npm run build

# Expose port and start app
EXPOSE 3000
CMD ["npm", "start"]
