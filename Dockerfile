FROM node:18.19.0

WORKDIR /usr/src/app

COPY ./front/package*.json .

RUN npm install --force
