# Dockerfile
FROM node:20-alpine AS base

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

# ------------------------
# Build Stage
# ------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all files
COPY . .

# Install all dependencies (including dev) and build
RUN yarn install --frozen-lockfile
RUN yarn build

# ------------------------
# Production Stage
# ------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs --ingroup nodejs
USER nextjs

# Copy built files and dependencies
COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/yarn.lock yarn.lock

# Expose port
EXPOSE 3000

# Environment
ENV NODE_ENV=production

# Start the app
CMD ["yarn", "start"]