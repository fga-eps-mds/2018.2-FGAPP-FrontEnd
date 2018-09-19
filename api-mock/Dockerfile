FROM node:9.3.0-alpine

RUN mkdir /app
WORKDIR /app

RUN apk update && \
    apk upgrade && \
    apk add git && \
    apk add bash && \
    npm install -g nodemon