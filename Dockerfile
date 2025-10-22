
# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --ignore-scripts

# ---------- dev ----------
FROM base AS dev
# Optional: CLI for convenience
RUN npm i -D @nestjs/cli
COPY tsconfig*.json ./
COPY src ./src
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
# In dev, we’ll bind-mount ./src via compose so hot-reload works

# ---------- build ----------
FROM base AS build
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build  # produces dist/

# ---------- prod ----------
FROM node:20-alpine AS prod
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=base  /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
