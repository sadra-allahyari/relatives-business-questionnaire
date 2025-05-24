# Use official Node.js image as the base
FROM node:23-alpine-slim

# Set working directory
WORKDIR /app

# Copy package.json and lockfile
COPY package.json pnpm-lock.yaml* ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Build the Next.js app
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "start"]
