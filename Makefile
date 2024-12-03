# # these will speed up builds, for docker-compose >= 1.25
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

build:
	docker-compose build

up-dev:
	docker-compose up -d

down:
	docker-compose down

down-remove-volumes:
	docker-compose down -v

test:
	docker-compose exec example_client npm test

build-ci:
	docker-compose -f docker-compose.ci.yml build

up-ci:
	docker-compose -f docker-compose.ci.yml up -d

test-ci:
	docker-compose -f docker-compose.ci.yml run --rm --no-deps --entrypoint='npm test' example_client

down-ci:
	docker-compose -f docker-compose.ci.yml down
