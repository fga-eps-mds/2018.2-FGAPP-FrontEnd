FROM node:9.3.0-alpine

RUN mkdir /app
WORKDIR /app

RUN apk add --no-cache bash
RUN npm install -g react-native-cli

ADD package.json package.json