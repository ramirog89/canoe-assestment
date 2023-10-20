FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN export NODE_OPTIONS=--openssl-legacy-provider

ENTRYPOINT npm run start
