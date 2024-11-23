# Node TypeScript Express Boilerplate

[![TypeScript version][ts-badge]][typescript-5-4]
[![Node.js version][nodejs-badge]][nodejs]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]

👩🏻‍💻 Developer Ready
🏃🏽 Instant Value: All basic tools included and configured:

- [TypeScript][typescript] [5.4][typescript-5-4] Configured
- [ESM][esm] modern ecmascript modules support
- Path aliasing natively with [Node.js][path-aliasing-node] and [TypeScript][path-aliasing-typescript]
- [Jest][jest] for fast unit testing and code coverage
- [Docker and Docker Compose][docker] configuration
- NPM [scripts](#available-scripts) for common operations
- [ESLint][eslint] with some initial rules recommendation
- [Prettier][prettier] to enforce consistent code style
- [EditorConfig][editorconfig] for consistent coding style
- [GitHub Actions][gh-actions] configuration for CI
- [Makefile][makefile] scripts for common developer operations

## Getting Started

Start adding your code in the `src` and tests in the `__tests__` directories.

### Setup
To setup the project run the following commands:

```sh
git clone git@github.com:msolorio/node-typescript-express-boilerplate.git
cd node-typescript-boilerplate
make build
make up
make test
```

## Make Scripts
Developer facing scripts to build, run, and test the application.

- `make build` - Build docker container
- `make dev` - Start app in watch mode
- `make test` - Run tests
- `make up` - Start from compiled code
- `make down` - Remove container
- `make logs` - Show container logs
- `make run cmd=<command-to-run>` - Runs command in container

### ES Modules

This template uses native [ESM][esm].

If your project requires CommonJS, you will have to [convert to ESM][sindresorhus-esm].

[express]: https://expressjs.com
[path-aliasing-node]: https://nodejs.org/api/packages.html#packages_subpath_imports
[path-aliasing-typescript]: https://www.typescriptlang.org/tsconfig/#paths
[docker]: https://www.docker.com/
[ts-badge]: https://img.shields.io/badge/TypeScript-5.4-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2020.9-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v20.x/docs/api/
[gha-badge]: https://github.com/jsynowiec/node-typescript-boilerplate/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/jsynowiec/node-typescript-boilerplate/actions/workflows/nodejs.yml
[typescript]: https://www.typescriptlang.org/
[typescript-5-4]: https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/jsynowiec
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[wiki-js-tests]: https://github.com/jsynowiec/node-typescript-boilerplate/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io
[volta]: https://volta.sh
[volta-getting-started]: https://docs.volta.sh/guide/getting-started
[volta-tomdale]: https://twitter.com/tomdale/status/1162017336699838467
[gh-actions]: https://github.com/features/actions
[repo-template-action]: https://github.com/jsynowiec/node-typescript-boilerplate/generate
[esm]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[sindresorhus-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[nodejs-esm]: https://nodejs.org/docs/latest-v16.x/api/esm.html
[ts47-esm]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#esm-nodejs
[editorconfig]: https://editorconfig.org
[makefile]: https://www.gnu.org/software/make/manual/make.html#Simple-Makefile