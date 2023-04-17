FROM node:18.5.0-alpine3.16 as builder

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

FROM node:18.5.0-alpine3.16 as prod-builder

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

FROM node:18.5.0-alpine3.16
# FROM gcr.io/distroless/nodejs18-debian11

ARG service

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=prod-builder /usr/src/app/apps/$service ./apps/$service/
COPY --from=prod-builder /usr/src/app/node_modules ./node_modules/
COPY --from=prod-builder /usr/src/app/packages ./packages/

EXPOSE 3000

WORKDIR /usr/src/app/apps/$service/dist

CMD ["node", "main.js"]

# distroless CMD
# CMD ["main.js"]
