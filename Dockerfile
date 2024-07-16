# node:20.12.2-bullseye
FROM node@sha256:80234aa9669e62c1fb47780d96128127c96fed663bd17dfacfe7bf9e5473884c

RUN mkdir /app
WORKDIR /app


COPY .eslintignore \
  .eslintrc.json \
  .prettierrc \
  jest.config.js \
  tsconfig.json \
  ./

COPY package*.json ./
RUN npm i

COPY src/ ./src
COPY tests/ ./tests
RUN npm run build