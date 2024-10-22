# # these will speed up builds, for docker-compose >= 1.25
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

build:
	docker compose build

up:
	docker compose up -d shopify_auth

dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d shopify_auth

test:
	docker compose run --rm --no-deps --entrypoint='npm test' shopify_auth

down:
	docker compose down

down-remove-volumes:
	docker compose down -v

logs:
	docker compose logs shopify_auth | tail -100

up-ci:
	docker compose -f docker-compose.ci.yml up -d shopify_auth

ts-build:
	docker compose run --rm --no-deps --entrypoint='npm run build' shopify_auth

test-coverage:
	docker compose run --rm --no-deps --entrypoint='npm run test:coverage' shopify_auth

test-ci:
	docker compose -f docker-compose.ci.yml run --rm --no-deps --entrypoint='npm test' shopify_auth

prisma-migrate:
	docker compose run --rm --no-deps --entrypoint='npm run prisma:migrate' shopify_auth

# Usage: make run cmd="npm i"
run:
	docker compose run --rm --no-deps --entrypoint='$(cmd)' shopify_auth