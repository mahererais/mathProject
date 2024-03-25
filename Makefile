

install:
	make start vendor-install

start:
	docker-compose up -d

stop:
	docker stop php-8.1-math phpmyadmin-math mariadb-math node-math

restart:
	make stop start

build:
	docker-compose build

build-no-cache:
	docker-compose build --no-cache

vendor-install:
	docker exec php-8.1-math bash -c "composer install --prefer-dist --no-interaction"

node-install:
	docker exec node-math -c "npm install --force"

clear-cache:
	docker exec php-8.1-math bash -c "php bin/console c:c"

warmup-cache:
	docker exec php-8.1-math bash -c "php bin/console c:warmup"

genere-jwt-key:
	docker exec php-8.1-math bash -c "php bin/console lexik:jwt:generate-keypair"

fixture:
	docker exec php-8.1-math bash -c "php bin/console d:d:c --no-interaction"
	docker exec php-8.1-math bash -c "php bin/console do:mi:mi --no-interaction"
	docker exec php-8.1-math bash -c "php bin/console do:fi:lo --no-interaction"