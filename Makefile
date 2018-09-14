default:
	make build

build:
	python get-ip-address.py
	docker-compose up

run:
	docker-compose exec front bash

down:
	docker-compose down

stop:
	make down
