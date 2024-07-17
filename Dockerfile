# node:20.12.2-bullseye
FROM node@sha256:80234aa9669e62c1fb47780d96128127c96fed663bd17dfacfe7bf9e5473884c

EXPOSE 80

RUN mkdir /app
WORKDIR /app

COPY .eslintignore \
  .eslintrc.json \
  .prettierrc \
  jest.config.js \
  tsconfig.json \
  package.json \
  package-lock.json \
  ./

RUN npm i

COPY src/ ./src
COPY __tests__/ ./__tests__
RUN npm run build

CMD ["npm", "start"]