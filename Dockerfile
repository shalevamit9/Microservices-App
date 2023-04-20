# sha is for node:18.16.0-slim
FROM node:lts-slim@sha256:09714f3334c1cda4ffac832880b57fc9c72253dd365ce7fa3ff1d1705aa9435a as builder

ARG service

WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./apps/$service/package.json ./apps/$service/package.json
COPY ./packages ./packages/
COPY ./turbo.json ./turbo.json

RUN npm ci

COPY ./apps/$service ./apps/$service

RUN npm run build

# sha is for node:18.16.0-slim
FROM node:lts-slim@sha256:09714f3334c1cda4ffac832880b57fc9c72253dd365ce7fa3ff1d1705aa9435a as prod-builder

ARG service
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/package-lock.json ./package-lock.json
COPY --from=builder /usr/src/app/apps/$service/package.json ./apps/$service/package.json
COPY --from=builder /usr/src/app/packages ./packages/

WORKDIR /usr/src/app/apps/$service

RUN npm ci

COPY --from=builder /usr/src/app/apps/$service/dist ./dist/

# sha is for node:18.16.0-alpine3.17
FROM node:lts-alpine@sha256:44aaf1ccc80eaed6572a0f2ef7d6b5a2982d54481e4255480041ac92221e2f11
# FROM gcr.io/distroless/nodejs18-debian11
RUN apk add dumb-init

ARG service
ENV NODE_ENV=production

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=prod-builder /usr/src/app/apps/$service ./apps/$service/
COPY --chown=node:node --from=prod-builder /usr/src/app/node_modules ./node_modules/
COPY --chown=node:node --from=prod-builder /usr/src/app/packages ./packages/

EXPOSE 3000

WORKDIR /usr/src/app/apps/$service/dist

CMD ["dumb-init", "node", "main.js"]

# distroless CMD
# CMD ["main.js"]
