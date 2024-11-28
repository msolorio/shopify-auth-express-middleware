# # these will speed up builds, for docker-compose >= 1.25
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

build:
	docker-compose build

up:
	docker-compose up -d
	# docker-compose exec -d example_client npm run build:watch

down:
	docker-compose down

down-remove-volumes:
	docker-compose down -v

test:
	docker-compose exec example_client npm test

