FROM node:20.16.0-bookworm@sha256:1ae9ba874435551280e95c8a8e74adf8a48d72b564bf9dfe4718231f2144c88f

EXPOSE 80

RUN mkdir /app
WORKDIR /app

COPY .eslintignore \
  .eslintrc.json \
  .editorconfig \
  .prettierrc \
  jest.config.js \
  tsconfig.json \
  package.json \
  package-lock.json \
  ./

RUN npm ci

COPY src/ ./src
COPY __tests__/ ./__tests__

RUN npm run build

CMD ["npm", "start"]
