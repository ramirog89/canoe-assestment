FROM node:alpine

WORKDIR /app

RUN pwd

RUN ls -la

COPY . .

RUN ls -la

RUN cat package.json

RUN npm install

RUN ls -la

ENTRYPOINT npm run start
