FROM node:9.3.0-alpine

RUN npm install -g create-react-native-app
RUN apk add --no-cache bash