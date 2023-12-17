#
# 🏡 Production
#
FROM node:18-alpine as web
WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app

COPY --chown=app:app ../package*.json ./

RUN npm install
RUN npm install -g serve
RUN chown -R app:app /app/node_modules

COPY --chown=app:app ../src src/
COPY --chown=app:app ../public public/
COPY --chown=app:app ../tailwind.config.js ./
COPY --chown=app:app ../tsconfig.json ./

# Собираем nestjs приложение
RUN mkdir -p ./build
RUN chown -R app:app ./build
RUN npm run build

# Переключаемся в созданного пользователя
USER app

CMD [ "npx", "serve", "-s", "build" ]