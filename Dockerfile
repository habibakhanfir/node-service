FROM node:10-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm install mongoose --save
