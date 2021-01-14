FROM node:latest

RUN mkdir /app

WORKDIR /app
RUN yarn global add pm2

COPY package.json yarn.lock /app/
RUN yarn cache clean
RUN yarn

COPY . /app/

RUN yarn build

EXPOSE $PORT