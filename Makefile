# # these will speed up builds, for docker-compose >= 1.25
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

build:
	docker-compose build

up:
	docker-compose up -d app && docker-compose exec -d app npm run build:watch

down:
	docker-compose down

logs:
	docker-compose logs app | tail -100

test:
	docker-compose run --rm --no-deps --entrypoint='npm test' app
