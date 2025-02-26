FROM node:20.11.1-alpine3.18 AS base
WORKDIR /app

FROM base AS deps
COPY .yarn/ ./.yarn/
COPY .yarnrc* package*.json ./
RUN yarn install --refresh-lockfile --network-timeout 600000

FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/yarn.lock ./yarn.lock
RUN yarn dlx turbo build

FROM base AS production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
