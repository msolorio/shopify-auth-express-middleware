# # these will speed up builds, for docker-compose >= 1.25
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

build:
	docker-compose build

up:
	docker-compose up -d app

down:
	docker-compose down

logs:
	docker-compose logs app | tail -100

ts-build: up
	docker-compose run --rm --no-deps --entrypoint='npm run build' app

test: up
	docker-compose run --rm --no-deps --entrypoint='npm test' app
