FROM node:20 AS builder

WORKDIR /app

COPY package.json package*.json ./

RUN npm install

RUN npm ci

COPY . .

FROM node:20 AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./tsconfig.json

CMD ["npm", "run", "dev"]