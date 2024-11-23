# # these will speed up builds, for docker-compose >= 1.25
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

build:
	docker compose build

up:
	docker compose up -d app

dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d app

test:
	docker compose run --rm --no-deps --entrypoint='npm test' app

down:
	docker compose down

down-remove-volumes:
	docker compose down -v

logs:
	docker compose logs app | tail -100

up-ci:
	docker compose -f docker-compose.ci.yml up -d app

ts-build:
	docker compose run --rm --no-deps --entrypoint='npm run build' app

test-coverage:
	docker compose run --rm --no-deps --entrypoint='npm run test:coverage' app

test-ci:
	docker compose -f docker-compose.ci.yml run --rm --no-deps --entrypoint='npm test' app

prisma-migrate:
	docker compose run --rm --no-deps --entrypoint='npm run prisma:migrate' app

# Usage: make run cmd="npm i"
run:
	docker compose run --rm --no-deps --entrypoint='$(cmd)' app