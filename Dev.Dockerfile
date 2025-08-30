# Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install all dependencies (dev + prod)
RUN yarn install --frozen-lockfile

# Don't copy source code here — we'll mount it at runtime
# That way, file changes are reflected instantly

# Expose port
EXPOSE 3000

# Start dev server
CMD ["yarn", "dev"]