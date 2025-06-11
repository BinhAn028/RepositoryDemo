# Use official Node.js image as the build environment
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm install; fi

# Copy all files
COPY . .

# Build Next.js app in standalone mode
RUN npm run build

# Production image, copy only necessary files
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy the standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# If your app uses next.config.js or other config files, copy them as needed
# COPY --from=builder /app/next.config.js ./

EXPOSE 3000

CMD ["node", "server.js"]
